import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from '../../contacts/contact.service';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';


@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() messages: Message;
  messageSender: string;
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    const contact: Contact = this.contactService.getContact(this.messages.id);
    this.messageSender = contact.name;
  }

}
