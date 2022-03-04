import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;
  currentContactId: number;
  pos: number;


  constructor(private http: HttpClient) {


    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxContactId();
  }

  getContacts(): Contact[] {
    this.http.get<Contact[]>('https://wdd430-cms-project-default-rtdb.firebaseio.com/contacts.json').subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxContactId();

        this.contacts.sort(function (a, b) {
          if (a.name < b.name) { return -1 }
          else if (a.name > b.name) { return 1 }
          else { return 0 }
        });

        let contactListCopy = this.contacts.slice();
        this.contactListChangedEvent.next(contactListCopy);
      },
      (error: any) => {
        console.log(error);
      }
    )
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    if(!this.contacts){
      return null;
    }
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

  storeContacts(contacts: Contact[]) {
    let getList = JSON.stringify(this.contacts);
    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');

    this.http.put(
      'https://wdd430-cms-project-default-rtdb.firebaseio.com/contacts.json',
      getList, { 'headers': httpHeaders }
    ).subscribe(() => {
      let contactsCopy = this.contacts.slice();
      this.contactListChangedEvent.next(contactsCopy);
    })
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);

    let contactsCopy = this.contacts.slice();
    this.storeContacts(contactsCopy);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    this.pos = this.contacts.indexOf(originalContact);
    if (this.pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[this.pos] = newContact;
    let contactsCopy = this.contacts.slice();
    this.storeContacts(contactsCopy);
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    let contactsCopy = this.contacts.slice();
    this.storeContacts(contactsCopy);
  }
}
