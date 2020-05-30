import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectorSerivce } from './../../services/connector.service';

@Component({
  selector: 'app-troll-page',
  templateUrl: './troll-page.component.html',
  styleUrls: ['./troll-page.component.scss']
})
export class TrollPageComponent implements OnInit {

tempName: string
username: string
trollForm: FormGroup;
error: any;
errorCount: number = 0;
dead = false;
posts = [];
post: any;
sub: any;
feedOpen: boolean = false;

  constructor(private connectorService: ConnectorSerivce) { }

  ngOnInit() {
    this.openFeed();
    this.createTrollForm();

    // this.API_URL =
    this.loadAllPosts();
    // this.loadPostsLoop();
  }

  createTrollForm() {
    this.trollForm = new FormGroup({
      'username': new FormControl(this.username),
      'content': new FormControl(null, Validators.required)
    });
  }

  openFeed() {
    this.feedOpen = true;
  }

  backToLogin() {
    this.feedOpen = false;
  }

  loadAllPosts() {
    // fetch(this.API_URL)
    //   .then(response => response.json())
    //   .then(posts => {
    //     this.posts = [];
    //     this.posts = posts
    //     console.log(this.posts);
    //   });
    this.connectorService.getTrollPosts().subscribe(response => {
      this.posts = response.body;
    })
  }

  loadPostsLoop() {
    setTimeout(() => {
      this.loadAllPosts();
      this.loadPostsLoop();
    }, 3000)
  }

  onLogin() {
    this.feedOpen = false;
  }

  onSubmit() {
    if (!this.username) {
      this.error = 'Please login to post!';
      return
    }
    if (this.trollForm.valid){
      this.post = {
        username: this.username,
        content: this.trollForm.controls.content.value
      };
      this.connectorService.postTrollPost(this.post).subscribe(response => {
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

  // Old fetch methods
  // sendPost(url: string, post: { username: string; content: string }){
  //   fetch(url, {
  //     method: 'POST',
  //     body: JSON.stringify(post),
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   }).then(response => response.json()).then(createdPost => {
  //     console.log(createdPost);
  //   });
  // }

  // loadAllPostsFetch() {
  //   fetch(this.API_URL)
  //     .then(response => response.json())
  //     .then(posts => {
  //       this.posts = [];
  //       this.posts = posts
  //       console.log(this.posts);
  //     });
  // }
}
