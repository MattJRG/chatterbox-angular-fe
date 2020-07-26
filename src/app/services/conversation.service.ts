import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()

export class ConversationService {
  conversationId: string;
  conversationTitle: string;

  conversationChanged = new Subject<boolean>();

}
