import {Injectable} from '@angular/core';
import {BoardsService} from "./boards.service";
import {Observable, Subject} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireAuth} from "angularfire2/auth";
import {Card} from "../components/cards/card";
import {CardService} from "./card.service";

interface Column {
  id:string;
  title: string;
}

@Injectable()
export class ColumnService {
  columns: any;
  boardId: any;
  columnId: any;
  columnss: any;
  delColumn : any;
  URL: string;
  columnsCollection: AngularFirestoreCollection<Column>;
  columnsColl: AngularFirestoreCollection<Column>;
  columnDoc: AngularFirestoreDocument<Column>;

  constructor(private auth: AngularFireAuth,
              private afs: AngularFirestore,
              private cardService: CardService) {
    this.columns = this.auth.authState
      .switchMap(user => {
        if (user) {
          this.columnsCollection =
            this.afs
              .collection(`boards`).doc(`${user.uid}`)
              .collection('userBoards').doc(`${this.boardId}`)
              .collection('boardColumns',  ref => ref.orderBy('date'));
            /*this.afs
            .collection(`column`).doc(`${user.uid}`)
            .collection('userColumn').doc(`${this.boardId}`).collection('boardColumn',
            ref => ref.orderBy('title','desc'));*/

          this.URL =  `column/${user.uid}/userColumn/${this.boardId}/boardColumn/`
          this.columnss = this.columnsCollection.snapshotChanges().map(changes => {
            return changes.map(a => {
              const data = a.payload.doc.data() as Column;
              data.id = a.payload.doc.id;
              return data;
            });
          });
          return this.columnss
        } else {
          return Observable.of(null)
        }
      });


  }

  getId(boardId:string) {
    this.boardId = boardId;
  }

/*  getCurrentBoard(board: Board) {

    this.boardsId = board.id;
  }*/
  addColumn(column:Column){
    this.columnsCollection.add(column);
  }
  changeColumnTitle(column:Column) {
    this.columnsCollection.doc(`${column.id}`).set(column)
  }



  deleteColumn(column: Column) {
    this.columnId = column.id;
  //  this.columnDoc = this.afs.doc(this.URL+`${this.columnId}`)
    this.delColumn =  this.columnsCollection.doc(`${this.columnId}`).delete();
   // this.columnDoc.delete();
   // this.deleteColumnId( )
  }
  deleteColumnId( ) {
  console.log('delete Column',this.delColumn);
   return this.delColumn;
  }



  getUserColumns() {
    return this.columns
  }

}
