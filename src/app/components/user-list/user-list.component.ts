import { Component, Output, EventEmitter } from "@angular/core";
import { Users } from './../../models/interfaces';
import { ConnectorService } from './../../services/connector.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent {

  users: Users;
  loadingUsers: boolean = true;
  @Output() changeConversation = new EventEmitter();

  constructor(
    private connectorService: ConnectorService,
    public userService: UserService) { }

  ngOnInit() {
    this.fetchOnlineUsers();
  }

  fetchOnlineUsers() {
    this.connectorService.getUsers().subscribe(response => {
      this.users = response.body.userData;
      console.log(response.body.userData);
      this.loadingUsers = false;
    }, error => {
      console.log('There was an error fetching active users!');
    })
  }

  sendFriendRequest(user) {
    console.log(user)
    this.connectorService.addFriend(user.userId).subscribe(response => {
      if (response.status === 200) {
        // Friend request has been sent to user
        // Refetch the users so we can now see that user as pending
        this.fetchOnlineUsers();
      }
    }, error => {
      console.log(`Error sending friend request to ${user.username}, please try again later.`)
    })
  }

  respondRequest(user, accept) {
    this.connectorService.respondToFriendRequest({ userId: user, accept: accept }).subscribe(response => {
      if (response.status === 200) {
        // Friend response successful
        // Fetch latest userdata
        this.fetchOnlineUsers();
      }
    })
  }

  switchConversation(id) {
    this.changeConversation.emit(id);
  }

}
