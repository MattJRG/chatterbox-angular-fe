import { Component, OnInit, Input } from "@angular/core";
import { ConnectorSerivce } from './../../services/connector.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})

export class VerifyComponent implements OnInit {

  @Input() vToken: string;
  message: string;
  loading: boolean = true;
  success: boolean;

  constructor(private connectorSerivce: ConnectorSerivce) {}

  ngOnInit() {
    if (this.vToken) {
      this.message = 'Verification token present';
      this.loading = true;
      this.connectorSerivce.verify(this.vToken).subscribe(response => {
        if (response.status === 200) {
          this.message = 'Account verified successfully, please login';
          this.loading = false;
          this.success = true;
        } else if (response.status === 204) {
          this.message = 'Account already verified';
          this.loading = false;
          this.success = true;
        } else {
          this.message = 'Response error, please contact support';
          this.loading = false;
        }
      }, err => {
        this.message = 'Account could not verified, please contact support';
        this.loading = false;
      })
    }
  }
}
