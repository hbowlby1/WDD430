import { Component, EventEmitter, Injectable, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})


export class ContactListComponent implements OnInit, OnDestroy {
  // @Output() selectedContactEvent = new EventEmitter<Contact>();
  //creating new array of contacts from contact.model.ts
  contacts: Contact[] = [];
  private subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
    .subscribe(
      (contact: Contact[]) => {
        this.contacts = contact;
      }
    );
  }

  search(value: string){
    this.term = value;
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
