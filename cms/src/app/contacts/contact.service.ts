import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;
  currentContactId: number;
  pos: number;


  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxContactId();
  }


  getContacts(): Contact[]{
    return this.contacts.slice();
  }

  getContact(id: string) {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getMaxContactId(): number {
    this.maxContactId = 0;

    for (let i = 0; i < this.contacts.length; i++) {
      const contact = this.contacts[i];
      this.currentContactId = +contact.id;

      if (this.currentContactId > this.maxContactId) {
        this.maxContactId = this.currentContactId;
      }
    }

    return this.maxContactId;
  }

  addContact(newContact: Contact){
    if(!newContact){
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  updateContact(originalContact: Contact, newContact: Contact){
    if(!originalContact || !newContact){
      return;
    }
    this.pos = this.contacts.indexOf(originalContact);
    if(this.pos < 0){
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[this.pos] = newContact;
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  deleteContact(contact: Contact){
    if(!contact){
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if(pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
