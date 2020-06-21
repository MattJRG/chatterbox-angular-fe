import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectorSerivce } from './../../services/connector.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-troll-page',
  templateUrl: './troll-page.component.html',
  styleUrls: ['./troll-page.component.scss']
})
export class TrollPageComponent implements OnInit {

trollForm: FormGroup;
error: any;
errorCount: number = 0;
dead = false;
posts = [];
scrolled: boolean = false;
initialLoad: boolean = true;
totalPosts: number = 0;
showEmojiMart: boolean = false;

  constructor(private connectorService: ConnectorSerivce, public userService: UserService) { }

  ngOnInit() {
    this.createTrollForm();
    this.loadAllPosts();
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
        console.log(response.body)
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
      this.connectorService.getTrollPosts(lastPostId).subscribe(response => {
        console.log(response.body)
        this.totalPosts = response.body.totalPosts;
        this.posts = response.body.posts;
        setTimeout(() => {
          this.updateScroll();
        }, 10)
      })
    }
  }

  // Need to run this function on scrolling to the top of the box..
  loadPrevious() {
    let firstPostId = this.getFirstItemId(this.posts);
    this.connectorService.getTrollPosts(`latestId=${firstPostId}&query=previous`).subscribe(response => {
      console.log(response.body)
      this.totalPosts = response.body.totalPosts;
      this.posts = [...response.body.posts, ...this.posts];
      // setTimeout(() => {
      //   this.updateScroll();
      // }, 10)
    })
  }

  getLastItemId(arr) {
    return arr[arr.length - 1].id
  }

  getFirstItemId(arr) {
    return arr[0].id
  }

  loadPostsLoop() {
    setTimeout(() => {
      this.loadAllPosts();
      this.loadPostsLoop();
    }, 3000)
  }

  updateScroll() {
    if (!this.scrolled) {
      var element = document.getElementById("trollbox-container");
      element.scrollTop = element.scrollHeight - 50;
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
        console.log(response);
        this.trollForm.controls.content.reset();
        this.error = false;
        setTimeout(() => {
          this.loadAllPosts();
        }, 1500)
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
