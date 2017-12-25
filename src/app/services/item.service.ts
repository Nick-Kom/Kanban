import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {Item} from "../components/items/items";
import {AngularFireAuth} from "angularfire2/auth";


@Injectable()
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemss: any;
  itemsById: any;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(private auth: AngularFireAuth,
              private afs: AngularFirestore) {
    this.items = this.auth.authState
      .switchMap(user => {
        if (user) {
          this.itemsCollection = this.afs.collection(`items`);
          this.itemss = this.itemsCollection.snapshotChanges().map(changes => {
            return changes.map(a => {
              const data = a.payload.doc.data() as Item;
              data.id = a.payload.doc.id;
              return data;
            });
          });

          return this.itemss
        } else {
          return Observable.of(null)
        }
      });
  }

  getItems(){
    return this.items;
  }

  addItem(item: Item){
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item){
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }

  updateItem(item: Item){
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
  }
 updateItems(items: any ){
    this.itemDoc = this.afs.doc(`items`);
    this.itemDoc.update(items);
  }


}
