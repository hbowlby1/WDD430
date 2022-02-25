import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import{Contact} from '../contact.model';
import {ContactService} from '../contact.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  //variable for draggable event
  addedContacts = [];
  

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if(!this.id){
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(this.id);
      if(!this.originalContact){
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if(this.contact.group && this.contact.group.length > 0) {
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
      }
    })
  }

  onCancel(){
    this.router.navigate(['/contacts']);
  }

  onSubmit(form: NgForm ){
    let value = form.value;
    let newContact = new Contact(
      value.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      []);

      if(this.editMode){
        this.contactService.updateContact(this.originalContact, newContact);
      }else{
        this.contactService.addContact(newContact);
      }
      this.router.navigate(['/contacts']);
  }

    //start for dragging and drop
    drop(event: CdkDragDrop<string[]>) {
      if(event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }

}
