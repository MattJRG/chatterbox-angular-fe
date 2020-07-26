import { ConnectorService } from './../../../services/connector.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})

export class ChatContentComponent implements OnInit {

  messages = [];
  initialLoad: boolean = true;
  totalMessages: number = 0;
  pollingInterval;
  interval: number = 1000;
  count: number = 0;

  @Input() conversationId: string;
  @Input() conversationTitle: string;
  @Input() loading: boolean;

  @ViewChild('chatboxContainer') chatbox: ElementRef;

  constructor(private connectorService: ConnectorService){}

  ngOnInit() {
    this.loadMessages();
    this.startDatabasePolling();
    console.log(this.conversationId)
    console.log(this.conversationTitle)
  }

  ngOnDestroy() {
    clearInterval(this.pollingInterval);
  }

  loadMessages() {
    // If this is the initial load fetch the last 100 messages
    if (this.initialLoad) {
      this.connectorService.getMessages(`conversationId=${this.conversationId}&query=initial`).subscribe(response => {
        this.totalMessages = response.body.totalMessages;
        this.messages = response.body.messages;
        setTimeout(() => {
          this.updateScroll();
        }, 10)
        this.initialLoad = false;
      })
    // Else fetch the new messages and add them to the messages array
    } else {
      let lastMessageId = this.getLastItemId(this.messages);
      this.connectorService.getMessages(`conversationId=${this.conversationId}&query=latest&latestId=${lastMessageId}`).subscribe(response => {
        this.evaluatePollingFrequency(response);
        this.totalMessages = response.body.totalMessages;
        this.messages = this.addLatestMessages(this.messages, response.body.messages);

        if (Math.ceil(this.chatbox.nativeElement.scrollHeight - this.chatbox.nativeElement.scrollTop) === this.chatbox.nativeElement.clientHeight) {
          setTimeout(() => {
            // Need to check if user is currently scrolled up, if so don't scroll them..
            this.updateScroll();
          }, 10)
        }
      })
    }
  }

  // Need to run this function on scrolling to the top of the box..
  loadPrevious() {
    let firstMessageId = this.getFirstItemId(this.messages);
    this.connectorService.getMessages(`conversationId=${this.conversationId}&query=previous&earliestId=${firstMessageId}`).subscribe(response => {
      this.totalMessages = response.body.totalMessages;
      this.messages = [...response.body.messages, ...this.messages];
    })
  }

  startDatabasePolling() {
    this.pollingInterval = setInterval(() => {
      this.loadMessages();
    }, this.interval);
  }

  updateScroll() {
    this.chatbox.nativeElement.scrollTop = this.chatbox.nativeElement.scrollHeight - 50;
  }

  // Determine if we need to poll the database as often as we are
  evaluatePollingFrequency(response) {
    if (response.body.messages.length === 0 && this.interval === 1000) {
      clearInterval(this.pollingInterval);
      this.interval = 3000;
      this.startDatabasePolling();
    } else if (response.body.messages.length === 0 && this.interval === 3000) {
      if (this.count < 10) this.count++;
      else {
        clearInterval(this.pollingInterval);
        this.interval = 30000;
        this.startDatabasePolling();
      }
    } else if (response.body.messages.length > 0 && this.interval > 1000) {
      clearInterval(this.pollingInterval);
      this.interval = 1000;
      this.startDatabasePolling();
    }
  }

  // Utility methods
  resetPollingInterval() {
    if (this.interval > 1000) {
      clearInterval(this.pollingInterval);
      this.interval = 1000;
      this.startDatabasePolling();
    }
  }


  addLatestMessages(oldArr, newArr) {
    let oldIds = [];
    oldArr.forEach(el => {
      oldIds.push(el.id)
    });
    newArr.forEach(el => {
      if (!oldIds.includes(el.id)){
        oldArr.push(el);
      }
    })
    return oldArr;
  }

  getLastItemId(arr) {
    return arr[arr.length - 1].id
  }

  getFirstItemId(arr) {
    return arr[0].id
  }

  get allMessagesFetched() {
    if (this.messages.length == this.totalMessages) return true;
    else return false;
  }


  isFirstMessage(i, message, messages) {
    // False - If this is the last message
    if (i == messages.length - 1) {
      return false;
    // True - if message is first message and then next message is from the same user
    } else if (i == 0 && message.userId == messages[i + 1].userId) {
      return true;
    // True - if message is not the first message but the next message is from the same user and the previous message is not
    } else if (i > 0 && message.userId == messages[i + 1].userId && message.userId !== messages[i - 1].userId) {
      return true;
    // False - if any other condition
    } else {
      return false;
    }
  }

  isMiddleMessage(i, message, messages) {
    // False - If this is the last message or first message
    if (i == 0 || i == messages.length - 1) {
      return false;
    // True - if message is not the first message or last message and the userId is the same as the previous and next messages
    } else if (message.userId == messages[i - 1].userId && message.userId == messages[i + 1].userId) {
      return true;
    // False - if any other condition
    } else {
      return false;
    }
  }

  isLastMessage(i, message, messages) {
    // False - If this is the first message
    if (i == 0) {
      return false;
    // False - if this is the last message but the previous message was from a different user
    } else if (i == messages.length - 1 && message.userId !== messages[i - 1].userId) {
    // True - if this is the last message but the previous message was from the same user
    } else if (i == messages.length - 1 && message.userId == messages[i - 1].userId) {
      return true;
    // True - If not the last message but previous message was from the same user but next message is not
    } else if (message.userId == messages[i - 1].userId && message.userId !== messages[i + 1].userId) {
      return true;
    // False - if any other condition
    } else {
      return false;
    }
  }

}

