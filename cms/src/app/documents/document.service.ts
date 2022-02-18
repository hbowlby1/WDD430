import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocId: number;
  currentDocId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocId = this.getMaxId();
   }


  //gets the document array from Mockdocs and saves it to a new array
  getDocuments(): Document[]{
    return this.documents.slice();
  }

  getDocument(id: string) {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }
  
  getMaxId(): number{
    this.maxDocId = 0;

    for (let i = 0; i < this.documents.length; i++) {
      const document = this.documents[i];
      this.currentDocId = +document.id;

      if (this.currentDocId > this.maxDocId) {
        this.maxDocId = this.currentDocId
      }
      return this.maxDocId;
    }
  }
  
  addDocument(newDoc: Document) {
    if(newDoc === undefined || newDoc === null){
      return;
    }
    this.maxDocId++;
    //id is saved as a string so we need to convert maxDocId to a string
    newDoc.id = this.maxDocId.toString();
    this.documents.push(newDoc);
    this.documentListChangedEvent.next(this.documents.slice());
  }
  
  updateDocument(originalDocument: Document, newDoc: Document){
    if(!originalDocument || !newDoc){
      return;
    }
    let pos = this.documents.indexOf(originalDocument)
    if(pos < 0){
      return;
    }
    
    newDoc.id = originalDocument.id;
    this.documents[pos] = newDoc;
    this.documentListChangedEvent.next(this.documents.slice());
  }
  
    deleteDocument(document: Document) {
      if (!document) {
         return;
      }
      const pos = this.documents.indexOf(document);
      if (pos < 0) {
         return;
      }
      this.documents.splice(pos, 1);
      this.documentListChangedEvent.next(this.documents.slice());
   }
}
