import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    http.get<Message[]>('https://wdd430-cms-project-default-rtdb.firebaseio.com/messages.json').subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();

        this.messages.sort(function (a, b) {
          if (a.id < b.id) { return -1 }
          else if (a.id > b.id) { return 1 }
          else { return 0; }
        });
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  public storeMessages(messages: Message[]) {

    let data = JSON.stringify(this.messages);
    let httpHeader: HttpHeaders = new HttpHeaders();
    httpHeader.set('Content-Type', 'application/json');

    this.http.put('https://wdd430-cms-project-default-rtdb.firebaseio.com/messages.json', data, { 'headers': httpHeader })
      .subscribe(() => {
        let messagesListClone = this.messages.slice();
        this.messageListChangedEvent.next(messagesListClone);
      }
      );
  }

  getMaxId(): number {
    let maxId = 0;

    for (let mes of this.messages) {
      let currentId = parseInt(mes.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
      return maxId;
    }
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message | null {
    if(!this.messages) {
      return null;
    }

    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(newMessage: Message) {
    if ((newMessage === undefined) || (newMessage === null)) {
      return;
    } else {
      this.maxMessageId++;

      newMessage.id = this.maxMessageId.toString();
      this.messages.push(newMessage);

      let MessagesListCopy = this.messages.slice();
      this.storeMessages(MessagesListCopy);
    }
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if((!originalMessage) || (!newMessage)) {
      return;
    } else {

      const pos = this.messages.indexOf(originalMessage);
      if (pos < 0) {
        return;
      }
      newMessage.id = originalMessage.id
      this.messages[pos] = newMessage;

      let MessagesListCopy = this.messages.slice();
      this.storeMessages(MessagesListCopy);
    }
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }

    const pos = this.messages.indexOf(message);
    if (pos < 0)
      return;

    this.messages.splice(pos, 1);
    let MessagesListCopy = this.messages.slice();
    this.storeMessages(MessagesListCopy);
  }


}
