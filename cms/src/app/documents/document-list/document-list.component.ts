import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Document} from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document("1", "test user 1", "asdf1", "asdf1.com", null),
    new Document("2", "test user 2", "asdf2", "asdf2.com", null),
    new Document("3", "test user 3", "asdf3", "asdf3.com", null),
    new Document("4", "test user 4", "asdf4", "asdf4.com", null)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
