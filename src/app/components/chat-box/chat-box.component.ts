import { ConversationService } from './../../services/conversation.service';
import { ChatContentComponent } from './chat-content/chat-content.component';
import { Component, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectorService } from './../../services/connector.service';
import { UserService } from './../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})

export class ChatBoxComponent {

chatInputForm: FormGroup;
error: any;
errorCount: number = 0;
showEmojiMart: boolean = false;
conversationClearing = false;
conversationTitle: string;
conversationId: string;
titleEdit: boolean = false;

@Input() loading: boolean;

private conversationChangeSub: Subscription

@ViewChild(ChatContentComponent) child:ChatContentComponent

  constructor(private connectorService: ConnectorService, public userService: UserService, private conversationService: ConversationService) {}

  ngOnInit() {
    this.createChatInputForm();
    // Get initial conversation details
    this.conversationId = this.conversationService.conversationId;
    this.conversationTitle = this.conversationService.conversationTitle;
    // Track if conversation changes
    this.conversationChangeSub = this.conversationService.conversationChanged.subscribe(conversationChanged => {
      if (conversationChanged) {
        this.conversationId = this.conversationService.conversationId;
        this.conversationTitle = this.conversationService.conversationTitle;
      }
    })
  }

  ngOnDestroy() {
    this.conversationChangeSub.unsubscribe();
  }

  createChatInputForm() {
    this.chatInputForm = new FormGroup({
      'content': new FormControl(null, [Validators.required, Validators.maxLength(250)])
    });
  }

  toggleEmojiMart() {
    this.showEmojiMart = !this.showEmojiMart;
  }

  addEmoji($event){
    let data = this.chatInputForm.get('content');
    if (data.value) {
      data.patchValue(data.value + $event.emoji.native);
    } else {
      data.patchValue($event.emoji.native);
    }
    this.toggleEmojiMart();
  }

  onSubmit() {
    if (this.chatInputForm.valid){
      let newMessage = {
        content: this.chatInputForm.controls.content.value
      };
      this.connectorService.postMessage(`conversationId=${this.conversationId}`,newMessage).subscribe(response => {
        this.chatInputForm.controls.content.reset();
        this.error = false;
        this.child.resetPollingInterval();
      }, error => {
        if (error.status === 403) {
          this.error = 'Please login to message!';
          console.log(error);
        }
      });
    }
  }
}


