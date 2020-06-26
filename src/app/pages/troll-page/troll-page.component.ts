import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectorSerivce } from './../../services/connector.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-troll-page',
  templateUrl: './troll-page.component.html',
  styleUrls: ['./troll-page.component.scss']
})
export class TrollPageComponent implements OnInit, OnDestroy {

trollForm: FormGroup;
error: any;
errorCount: number = 0;
dead = false;
posts = [];
initialLoad: boolean = true;
totalPosts: number = 0;
showEmojiMart: boolean = false;
pollingInterval;
interval: number = 1000;
count: number = 0;

@ViewChild('trollboxContainer') trollbox: ElementRef;

  constructor(private connectorService: ConnectorSerivce, public userService: UserService) { }

  ngOnInit() {
    this.createTrollForm();
    this.loadAllPosts();
    this.startDatabasePolling();
  }

  ngOnDestroy() {
    clearInterval(this.pollingInterval);
  }

  createTrollForm() {
    this.trollForm = new FormGroup({
      'content': new FormControl(null, [Validators.required, Validators.maxLength(250)])
    });
  }

  loadAllPosts() {
    // If this is the initial load fetch the last 100 posts
    if (this.initialLoad) {
      this.connectorService.getTrollPosts('query=initial').subscribe(response => {
        this.totalPosts = response.body.totalPosts;
        this.posts = response.body.posts;
        setTimeout(() => {
          this.updateScroll();
        }, 10)
        this.initialLoad = false;
      })
    // Else fetch the new posts and add them to the posts array
    } else {
      let lastPostId = this.getLastItemId(this.posts);
      this.connectorService.getTrollPosts(`query=latest&latestId=${lastPostId}`).subscribe(response => {
        this.evaluatePollingFrequency(response);
        this.totalPosts = response.body.totalPosts;
        this.posts = this.addLatestPosts(this.posts, response.body.posts);

        if (Math.ceil(this.trollbox.nativeElement.scrollHeight - this.trollbox.nativeElement.scrollTop) === this.trollbox.nativeElement.clientHeight) {
          setTimeout(() => {
            // Need to check if user is currently scrolled up, if so don't scroll them..
            this.updateScroll();
          }, 10)
        }
      })
    }
  }

  // Need to run this function on scrolling to the top of the box..
  loadPrevious() {
    let firstPostId = this.getFirstItemId(this.posts);
    this.connectorService.getTrollPosts(`query=previous&earliestId=${firstPostId}`).subscribe(response => {
      this.totalPosts = response.body.totalPosts;
      this.posts = [...response.body.posts, ...this.posts];
    })
  }

  addLatestPosts(oldArr, newArr) {
    let oldIds = [];
    oldArr.forEach(el => {
      oldIds.push(el.id)
    });
    newArr.forEach(el => {
      if (!oldIds.includes(el.id)){
        oldArr.push(el);
      }
    })
    return oldArr;
  }

  getLastItemId(arr) {
    return arr[arr.length - 1].id
  }

  getFirstItemId(arr) {
    return arr[0].id
  }

  startDatabasePolling() {
    this.pollingInterval = setInterval(() => {
      this.loadAllPosts();
    }, this.interval);
  }

  updateScroll() {
    this.trollbox.nativeElement.scrollTop = this.trollbox.nativeElement.scrollHeight - 50;
  }

  // Determine if we need to poll the database as often as we are
  evaluatePollingFrequency(response) {
    if (response.body.posts.length === 0 && this.interval === 1000) {
      clearInterval(this.pollingInterval);
      this.interval = 3000;
      this.startDatabasePolling();
    } else if (response.body.posts.length === 0 && this.interval === 3000) {
      if (this.count < 10) this.count++;
      else {
        clearInterval(this.pollingInterval);
        this.interval = 30000;
        this.startDatabasePolling();
      }
    } else if (response.body.posts.length > 0 && this.interval > 1000) {
      clearInterval(this.pollingInterval);
      this.interval = 1000;
      this.startDatabasePolling();
    }
  }

  toggleEmojiMart() {
    this.showEmojiMart = !this.showEmojiMart;
  }

  addEmoji($event){
    let data = this.trollForm.get('content');
    if (data.value) {
      data.patchValue(data.value + $event.emoji.native);
    } else {
      data.patchValue($event.emoji.native);
    }
    this.toggleEmojiMart();
  }

  get allPostsFetched() {
    if (this.posts.length == this.totalPosts) return true;
    else return false;
  }

  isFirstPost(i, post, posts) {
    // False - If this is the last post
    if (i == posts.length - 1) {
      return false;
    // True - if post is first post and then next post is from the same user
    } else if (i == 0 && post.userId == posts[i + 1].userId) {
      return true;
    // True - if post is not the first post but the next post is from the same user and the previous post is not
    } else if (i > 0 && post.userId == posts[i + 1].userId && post.userId !== posts[i - 1].userId) {
      return true;
    // False - if any other condition
    } else {
      return false;
    }
  }

  isMiddlePost(i, post, posts) {
    // False - If this is the last post or first post
    if (i == 0 || i == posts.length - 1) {
      return false;
    // True - if post is not the first post or last post and the userId is the same as the previous and next posts
    } else if (post.userId == posts[i - 1].userId && post.userId == posts[i + 1].userId) {
      return true;
    // False - if any other condition
    } else {
      return false;
    }
  }

  isLastPost(i, post, posts) {
    // False - If this is the first post
    if (i == 0) {
      return false;
    // False - if this is the last post but the previous post was from a different user
    } else if (i == posts.length - 1 && post.userId !== posts[i - 1].userId) {
    // True - if this is the last post but the previous post was from the same user
    } else if (i == posts.length - 1 && post.userId == posts[i - 1].userId) {
      return true;
    // True - If not the last post but previous post was from the same user but next post is not
    } else if (post.userId == posts[i - 1].userId && post.userId !== posts[i + 1].userId) {
      return true;
    // False - if any other condition
    } else {
      return false;
    }
  }

  onSubmit() {
    if (this.trollForm.valid){
      let newPost = {
        content: this.trollForm.controls.content.value
      };
      this.connectorService.postTrollPost(newPost).subscribe(response => {
        this.trollForm.controls.content.reset();
        this.error = false;
        if (this.interval > 1000) {
          clearInterval(this.pollingInterval);
          this.interval = 1000;
          this.startDatabasePolling();
        }
      }, error => {
        if (error.status === 403) {
          this.error = 'Please login to post!';
          console.log(error);
        }
      });
    } else {
      this.errorCount++
      if (this.errorCount <= 1) {
        this.error = 'You can do better than that'
      } else if (this.errorCount === 2) {
        this.error = 'Up your game troll!'
      } else if (this.errorCount === 3) {
        this.error = 'Now this is getting old'
      } else if (this.errorCount === 4) {
        this.error = 'Your ingnorance bothers me'
      } else if (this.errorCount === 5) {
        this.error = 'Y U DO THIS!!'
      }else if (this.errorCount === 6) {
        this.error = "Listen up mate change your ways or you're gone!"
      } else if (this.errorCount === 7) {
        this.error = 'FINAL WARNING!!'
      } else if (this.errorCount === 8) {
        this.error = 'SEE YOU IN HELL!'
        setTimeout(() => {
          this.dead = true;
        }, 2000);
      }
    }
  }
}
