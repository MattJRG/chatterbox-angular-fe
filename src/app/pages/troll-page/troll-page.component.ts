import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectorSerivce } from './../../services/connector.service';

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

  constructor(private connectorService: ConnectorSerivce) { }

  ngOnInit() {
    this.createTrollForm();
    this.loadAllPosts();
  }

  createTrollForm() {
    this.trollForm = new FormGroup({
      'content': new FormControl(null, Validators.required)
    });
  }

  loadAllPosts() {
    this.connectorService.getTrollPosts().subscribe(response => {
      console.log(response.body)
      this.posts = response.body;
      setTimeout(() => {
        this.updateScroll();
      }, 1000)
    })
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
