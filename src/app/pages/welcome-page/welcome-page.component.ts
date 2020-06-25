import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  state: string;
  loggedIn: boolean = false;
  vToken: string;
  rKey: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // If logged in send user to homepage
    if (this.loggedIn) {
      this.redirectToHomepage();
    } else {
      this.state = 'Login';
    }

    this.activatedRoute.queryParams.subscribe(params => {
      this.vToken = params['v-token'];
      this.rKey = params['r-key'];
    })
  }

  changeState(value) {
    this.state = value;
  }

  redirectToHomepage() {
    this.router.navigateByUrl('/home');
  }
}
