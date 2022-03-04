import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {Message} from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
  providers: [MessageService]
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subject', {static: false}) subjectRef: ElementRef;
  @ViewChild('msgText', {static:false}) msgTextRef: ElementRef;

  //@Output() addMessageEvent = new EventEmitter<Message>();
  
  currentSender: string = "Harrison Bowlby";

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }
  
  onSendMessage(){
    let subject = (String)(this.subjectRef.nativeElement.value);
    let msgText = (String)(this.msgTextRef.nativeElement.value);
    let newMsg = new Message('0', subject, msgText, this.currentSender);

    this.messageService.addMessage(newMsg);
    this.onClear();
  }

  onClear(){
    this.subjectRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }
}
