import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ConnectorSerivce } from './../../services/connector.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/interfaces';


@Component({
  selector: 'app-troll-page',
  templateUrl: './troll-page.component.html',
  styleUrls: ['./troll-page.component.scss']
})
export class TrollPageComponent {

  users: User[];
  friends: User[];
  loadingUsers: boolean = true;

  constructor(
    private connectorService: ConnectorSerivce,
    public userService: UserService) { }


  ngOnInit() {
    // this.friends = [
    //   {
    //     userId: "372hdhfuefe",
    //     username: "Joe",
    //     friend: true
    //   },
    //   {
    //     userId: "372hd33322efe",
    //     username: "Kyle",
    //     friend: true
    //   }
    // ]
    // this.users = [
    //   {
    //     userId: "372hdhfgressss",
    //     username: "Tom",
    //     friend: false,
    //     pending: true
    //   },
    //   {
    //     userId: "372hdhfullglglg",
    //     username: "Jack",
    //     friend: false
    //   },
    // ]
    this.fetchOnlineUsers();
  }

  fetchOnlineUsers() {
    this.connectorService.getOnlineUsers().subscribe(response => {
      this.users = response.body.onlineUsers;
      this.loadingUsers = false;
    }, error => {
      console.log('There was an error fetching active users!')
    })
  }

  sendFriendRequest() {

  }
}
