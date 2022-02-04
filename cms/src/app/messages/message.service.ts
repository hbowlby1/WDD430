import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesChangedEvent = new EventEmitter<Message[]>();
  
  messages: Message[];

  constructor() {
    this.messages = MOCKMESSAGES;
   }


  getMessages(): Message[]{
    return this.messages.slice();
  }

  getContact(id: string): Message{
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(messages: Message){
    this.messages.push(messages);
    this.messagesChangedEvent.emit(this.messages.slice());
  }
}
