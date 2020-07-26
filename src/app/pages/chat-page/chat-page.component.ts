import { ConversationService } from './../../services/conversation.service';
import { ChatBoxComponent } from './../../components/chat-box/chat-box.component';
import { Component, OnInit, ViewChild } from "@angular/core";
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
  conversationLoading: boolean = true;
  sidebarTab: string = 'chats';

  @ViewChild(ChatBoxComponent) child:ChatBoxComponent;

  constructor(public userService: UserService, private connectorSevice: ConnectorService, private conversationService: ConversationService) {}

  ngOnInit() {
    if (!this.conversationTitle) {
      this.conversationId = 'Trollbox';
      this.conversationTitle = 'Trollbox';
      this.conversationLoading = false;
      this.conversationService.conversationId = this.conversationId;
      this.conversationService.conversationTitle = this.conversationTitle;
      this.conversationService.conversationChanged.next(true);
    }
  }

  switchConversation(id) {
    this.conversationLoading = true;
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
      this.conversationLoading = false;
      this.conversationService.conversationId = this.conversationId;
      this.conversationService.conversationTitle = this.conversationTitle;
      this.conversationService.conversationChanged.next(true);
    }, error => {
      console.log(error);
    })
  }

  switchToConversation(conversation) {
    this.conversationLoading = true;
    console.log(`Switched conversation to ${conversation.title}.`);
    setTimeout(() => {
      this.conversationId = conversation._id;
      this.conversationTitle = conversation.title;
      this.conversationLoading = false;
      this.conversationService.conversationId = this.conversationId;
      this.conversationService.conversationTitle = this.conversationTitle;
      this.conversationService.conversationChanged.next(true);
    }, 100)
  }
}
