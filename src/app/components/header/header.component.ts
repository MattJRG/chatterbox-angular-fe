import { Component } from "@angular/core";
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class AppHeader {

  constructor(public userService: UserService) {}

  logout() {
    this.userService.logout();
  }
}
