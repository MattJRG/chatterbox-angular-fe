import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectorSerivce } from '../../services/connector.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit{

  resetKey: string;
  error: string;
  resetPasswordForm: FormGroup;
  @Output() stateChange = new EventEmitter();

  constructor(
    private connectorService: ConnectorSerivce,
    private route:ActivatedRoute
  ) {}

  ngOnInit() {
    // Check for the email reset key
    this.resetKey = this.route.snapshot.params['rKey'];

    // If reset key not present display error
    if (!this.resetKey) {
      this.error = 'This route only works with reset email link';
    } else {
      this.createRegistrationForm();
    }
  }

  createRegistrationForm() {
    this.resetPasswordForm = new FormGroup({
    'newPassword': new FormControl('', Validators.required),
    'confirmPassword': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      if (this.resetPasswordForm.controls.newPassword.value === this.resetPasswordForm.controls.confirmPassword.value)
      this.register();
    } else {
      console.log('Please ensure passwords match');
    }
  }

  register() {
    let credentials = {
      newPassword: this.resetPasswordForm.controls.username.value,
      resetKey: this.resetKey
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
    this.stateChange.emit('login');
  }

}
