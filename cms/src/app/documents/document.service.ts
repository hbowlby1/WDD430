import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

  private documents: Document[] = [];

  //gets the document array from Mockdocs and saves it to a new array
  getDocuments(): Document[]{
    return this.documents.slice();
  }

  getDocument(id:string): Document{
    this.documents.forEach(document => {
      if(document.id === id){
        return document;
      }
    });
    return null;
  }
}
