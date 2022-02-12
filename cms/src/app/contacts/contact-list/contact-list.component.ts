import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})


export class ContactListComponent implements OnInit {
  // @Output() selectedContactEvent = new EventEmitter<Contact>();
  //creating new array of contacts from contact.model.ts
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent
    .subscribe(
      (contact: Contact[]) => {
        this.contacts = contact;
      }
    )
  }
}
