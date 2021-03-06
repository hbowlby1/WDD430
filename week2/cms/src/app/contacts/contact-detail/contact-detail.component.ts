import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact; 
  //removed because I no longer need getContacts
  // getContacts = new Contact("", "", "", "", "", null);
  constructor() { }

  ngOnInit(): void {
  }

}
