import { Conversation } from './../../models/interfaces';
import { Component, Output, EventEmitter, Input } from "@angular/core";
import { ConnectorService } from '../../services/connector.service';
import {BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})

export class ConversationListComponent {

  conversations: Conversation[];
  loadingConversations: boolean = true;
  screenLarge: boolean;
  @Output() changeConversation = new EventEmitter();

  constructor(private connectorService: ConnectorService, breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(['(min-width: 1200px)']).subscribe(result => {
      if (result.matches) this.screenLarge = true;
    });
   }

  ngOnInit() {
    this.fetchUserConversations();

  }

  fetchUserConversations() {
    this.connectorService.getAllConversations().subscribe(response => {
      this.conversations = response.body.conversations;
      console.log(this.conversations);
      this.loadingConversations = false;
    }, error => {
      console.log('There was an error fetching active users!');
    })
  }

  switchToConversation(conversation) {
    this.changeConversation.emit(conversation);
  }

}
