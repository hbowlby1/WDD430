import { Component, Input, OnInit, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1, "something", "something goes here", "Conny Fused"),
    new Message(2, "more stuff", "just putting text here.", "random student"),
    new Message(3, "hopefully I'm done", "This is a long assignment", "not a random student")
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
