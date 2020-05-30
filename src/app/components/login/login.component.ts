import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectorSerivce } from './../../services/connector.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

loginForm: FormGroup;
username: string;

@Output() stateChange = new EventEmitter();

constructor(private connectorService: ConnectorSerivce) {}

ngOnInit() {
  this.createLoginForm();
}

  createLoginForm() {
    this.loginForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
    });
  }

  onloginSubmit() {
    if (this.loginForm.valid) {
      this.login();
    }
  }

  login() {
    let credentials ={
      name: this.loginForm.controls.name.value,
      pass: this.loginForm.controls.password.value
    }
    console.log(credentials);
    this.connectorService.trollLogin(credentials).subscribe((response) => {
      if (response.status === 200) {
      console.log('Login successful!');
      this.username = credentials.name;
      console.log(response)
      localStorage.setItem('authToken', response.body.token);
      // this.openFeed();
      }
    }, error => {
      console.log('Login details incorrect!');
    })
  }

  openRegister() {
    this.stateChange.emit('register')
  }

}
