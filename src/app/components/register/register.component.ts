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
  @Output() stateChange = new EventEmitter();

  constructor(private connectorService: ConnectorSerivce) {}

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'shoeSize': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.register();
    } else {
      console.log('Please enter valid details');
    }
  }

  register() {
    let credentials = {
      name: this.registrationForm.controls.name.value,
      pass: this.registrationForm.controls.password.value,
      shoeSize: this.registrationForm.controls.shoeSize.value
    }
    console.log(credentials);
    this.connectorService.register(credentials).subscribe((response) => {
      if (response.status === 200) {
      console.log('Registration successful!');
      // this.username = credentials.name;
      console.log(response)
      }
    }, error => {
      console.log('Error with registration!');
      console.log(error);
    })
  }

  openLogin() {
    this.stateChange.emit('login');
  }

}
