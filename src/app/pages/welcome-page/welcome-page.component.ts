import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  state: string
  loggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // If logged in send user to homepage
    if (this.loggedIn) {
      this.redirectToHomepage();
    } else {
      this.state = 'login';
    }
  }

  changeState(value) {
    this.state = value;
  }

  redirectToHomepage() {
    this.router.navigateByUrl('/home');
  }
}
