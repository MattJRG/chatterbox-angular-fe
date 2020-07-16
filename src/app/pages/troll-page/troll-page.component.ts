import { Component } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-troll-page',
  templateUrl: './troll-page.component.html',
  styleUrls: ['./troll-page.component.scss']
})
export class TrollPageComponent {

  constructor(
    public userService: UserService) { }

}
