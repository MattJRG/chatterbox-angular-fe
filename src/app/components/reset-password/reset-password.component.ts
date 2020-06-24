import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectorSerivce } from '../../services/connector.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit{

  @Input() resetKey: string;
  @Output() stateChange = new EventEmitter();

  loading: boolean = false;
  error: string;
  resetPasswordForm: FormGroup;

  constructor(
    private connectorService: ConnectorSerivce,
    private route:ActivatedRoute
  ) {}

  ngOnInit() {
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
      this.resetPassword();
    } else {
      this.error = 'Please ensure passwords match';
    }
  }

  resetPassword() {
    this.loading = true;
    let credentials = {
      newPassword: this.resetPasswordForm.controls.username.value,
      resetKey: this.resetKey
    }
    console.log(credentials);
    this.connectorService.reset(credentials).subscribe(response => {
      if (response.status === 200) {
      console.log('Password reset successful!');
      console.log(response);
      }
    }, error => {
      console.log('Error resetting password!');
      console.log(error);
    })
  }

  openLogin() {
    this.stateChange.emit('reset');
  }

}
