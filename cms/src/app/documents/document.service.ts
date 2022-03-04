import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocId: number;
  currentDocId: number;

  constructor(private http: HttpClient) {

  }

  //gets the document array from Mockdocs and saves it to a new array
  getDocuments(): Document[] {
    this.http.get<Document[]>('https://wdd430-cms-project-default-rtdb.firebaseio.com/documents.json').subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocId = this.getMaxId();

        this.documents.sort(function (a, b) {
          if (a.name < b.name) { return -1 }
          else if (a.name > b.name) { return 1 }
          else { return 0 }
        });

        let documentsListCopy = this.documents.slice();
        this.documentListChangedEvent.next(documentsListCopy);
      },
      (error: any) => {
        console.log(error);
      }
    );
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

  getMaxId(): number {
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

  storeDocuments(documents: Document[]) {
    let getList = JSON.stringify(this.documents);
    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');

    this.http.put(
      'https://wdd430-cms-project-default-rtdb.firebaseio.com/documents.json',
      getList, { 'headers': httpHeaders })
      .subscribe(() => {
        let documentsCopy = this.documents.slice();
        this.documentListChangedEvent.next(documentsCopy);
      });
  }

  addDocument(newDoc: Document) {
    if (newDoc === undefined || newDoc === null) {
      return;
    }
    this.maxDocId++;
    //id is saved as a string so we need to convert maxDocId to a string
    newDoc.id = this.maxDocId.toString();
    this.documents.push(newDoc);
    let documentsCopy = this.documents.slice();
    this.storeDocuments(documentsCopy);
  }

  updateDocument(originalDocument: Document, newDoc: Document) {
    if (!originalDocument || !newDoc) {
      return;
    }
    let pos = this.documents.indexOf(originalDocument)
    if (pos < 0) {
      return;
    }

    newDoc.id = originalDocument.id;
    this.documents[pos] = newDoc;
    let documentsCopy = this.documents.slice();
    this.storeDocuments(documentsCopy);
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
    let documentsCopy = this.documents.slice();
    this.storeDocuments(documentsCopy);
  }

}
