import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectorSerivce } from './../../services/connector.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit{

  registrationForm: FormGroup;
  error: string;
  @Output() stateChange = new EventEmitter();

  constructor(private connectorService: ConnectorSerivce) {}

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = new FormGroup({
    'username': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.register();
    } else {
      this.error = 'Please enter valid details';
    }
  }

  register() {
    let credentials = {
      email: this.registrationForm.controls.email.value,
      username: this.registrationForm.controls.username.value,
      password: this.registrationForm.controls.password.value,
    }
    console.log(credentials);
    this.connectorService.register(credentials).subscribe((response) => {
      if (response.status === 200) {
      console.log('Registration successful!');
      console.log(response)
      }
    }, error => {
      console.log('Error with registration!');
      console.log(error);
    })
  }

  openLogin() {
    this.stateChange.emit('Login');
  }

}
