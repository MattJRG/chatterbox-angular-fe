import { Component, OnInit } from "@angular/core";
import { UserService } from './../../services/user.service';
import { ConnectorService } from './../../services/connector.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})

export class ChatPageComponent implements OnInit {

  conversationId: string;
  conversationTitle: string;

  constructor(public userService: UserService, private connectorSevice: ConnectorService) {}

  ngOnInit() {
    if (!this.conversationTitle) {
      this.conversationId = 'Trollbox';
      this.conversationTitle = 'Trollbox';
    }
  }

  switchConversation(id) {
    console.log(`Switched chat to id: ${id}.`);
    // Fetch the conversation details and messages for this new conversation
    let query = '';
    if (id == 'trollbox') {
      query = 'participants=trollbox';
    } else {
      // Should switch this to an array
      query = `participants=${id}`;
    }
    // MAY NEED A NEW ENDPOINT JUST TO GET CONVERSATION DETAILS BEFORE FETCHING MESSAGES
    this.connectorSevice.getConversation(query).subscribe(response => {
      this.conversationId = response.body.conversationId;
      this.conversationTitle = response.body.conversationTitle;
    }, error => {
      console.log(error);
    })
  }
}
