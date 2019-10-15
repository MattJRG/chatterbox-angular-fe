import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-troll-page',
  templateUrl: './troll-page.component.html',
  styleUrls: ['./troll-page.component.scss']
})
export class TrollPageComponent implements OnInit {

//  @Input() username: string
tempName: string
username: string
trollForm: FormGroup;
API_URL: string;
error: any;
errorCount: number = 0;
dead = false;
posts = [];
post: any;
sub: any;
rhymeArray = [
  {
  id: 1,
  list: ['pipe', 'blype', 'clype', 'cripe', 'd-type', 'flipe', 'flype', 'gipe', 'gripe', 'grype', 'heiap', 'hype', 'knipe', 'lipe', 'p-type', 'quipe', 'r.i.p', 'ripe', 'shipe', 'sipe', 'skype', 'slipe', 'slype', 'snipe', 'stipe', 'stripe', 'stype', 'swipe', 'syp', 'tripe', 'type', 'wipe']
  },
  {
    id: 2,
    list: ['head', 'bled', 'bread', 'bred', 'chsld', 'cread', 'dead', 'dread', 'dred', 'dredd', 'ed', 'fed', 'fleadh', 'fled', 'fread', 'fred', 'freda', 'ged', 'head', 'jed', 'lead', 'led', 'lvedp', 'med', 'ned', 'nedd', 'pled', 'read', 'reade', 'red', 'redd', 'redde', 'said', 'shead', 'shed', 'shedd', 'shred', 'sled', 'sledd', 'spead', 'sped', 'spread', 'stead', 'ted', 'thread', 'tread', 'wed', 'wedd', 'zed']
  },
  {
    id: 3,
    list: ['round', 'bound', 'browned', 'clowned', 'crowned', 'downed', 'drowned', 'found', 'frowned', 'gowned', 'ground', 'hound', 'mound', 'pound', 'stound', 'wound']
  }
]

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (window.location.hostname === 'localhost') {
      this.API_URL = 'http://localhost:5000/trolls';
    } else {
      this.API_URL = 'https://trollfeed-api.now.sh/trolls';
    }
    this.trollForm = new FormGroup({
      'username': new FormControl(this.username),
      'content': new FormControl(null, Validators.required)
    });
    this.loadAllPosts();
    this.loadPostsLoop();
  }


  sendPost(url: string, post: { username: string; content: string }){
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json()).then(createdPost => {
      console.log(createdPost)
    })
  }

  assignUsername() {
    this.username = this.tempName.toString();
  }

  loadAllPosts() {
    fetch(this.API_URL)
      .then(response => response.json())
      .then(posts => {
        this.posts = [];
        this.posts = posts
        console.log(this.posts);
      });
  }

  loadPostsLoop() {
    setTimeout(() => {
      this.loadAllPosts();
      this.loadPostsLoop();
    }, 3000)
  }

  onSubmit() {
    if (this.trollForm.valid){
      this.post = {
        username: this.username,
        content: this.trollForm.controls.content.value
      };

      console.log(this.post);
      this.sendPost(this.API_URL, this.post);
      this.trollForm.controls.content.reset();
      this.error = false;
      setTimeout(() => {
        this.loadAllPosts();
      }, 1500)
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
