import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectorService } from './../../services/connector.service';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

loginForm: FormGroup;
error: string;

@Output() stateChange = new EventEmitter();

constructor(
  private connectorService: ConnectorService,
  private userService: UserService,
  private router: Router) {}

ngOnInit() {
  this.createLoginForm();
}

  createLoginForm() {
    this.loginForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
    });
  }

  onloginSubmit() {
    if (this.loginForm.valid) {
      this.login();
    }
  }

  login() {
    let credentials = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }
    this.connectorService.login(credentials).subscribe((response) => {
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.setItem('user', response.body.username);
        this.userService.setToken(response.body.token);
        this.router.navigateByUrl('/chat')
      }
    }, error => {
      if (error.status === 404) {
        this.error = error.error.message;
      }
    })
  }

  // Todo!
  forgotPassword() {
    this.connectorService.forgot(this.loginForm.controls.email.value).subscribe((response) => {
    })
  }

  openRegister() {
    this.stateChange.emit('Register')
  }

}
