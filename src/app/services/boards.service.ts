import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable} from "@angular/core";
import * as firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable, Subject} from "rxjs/Rx";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import {Board} from "../components/boards/board/board";
import {Column} from "../components/columns/column";
import {Card} from "../components/cards/card";
import {ColumnService} from "./column.service";

@Injectable()
export class BoardsService {
  boards: any;
  board: any;
  boardss: any;
  URL: string;
  columnURL: string;
  cardURL: string;
  boardId: string;
  currentBoard: Board;
  boardsCollection: AngularFirestoreCollection<Board>;
  columnsCollection: AngularFirestoreCollection<Column>;
  cardsCollection: AngularFirestoreCollection<Card>;
  boardDoc: AngularFirestoreDocument<Board>;
  columnDoc: AngularFirestoreDocument<Column>;
  cardDoc: AngularFirestoreDocument<Card>;
  private subject = new Subject<any>();
  bbbb: any;

  constructor(private auth: AngularFireAuth,
              private columnService: ColumnService,
              private afs: AngularFirestore) {

    this.boards = this.auth.authState
      .switchMap(user => {
        if (user) {
          this.boardsCollection = this.afs.collection(`boards/${user.uid}/userBoards`,
            ref => ref.orderBy('date'));
          this.URL = `boards/${user.uid}/userBoards/`

          this.columnsCollection =
            this.afs
              .collection(`boards`).doc(`${user.uid}`)
              .collection('userBoards').doc(`${this.boardId}`)
              .collection('boardColumns');
          this.cardsCollection = this.afs
            .collection(`boards`).doc(`${user.uid}`)
            .collection('userBoards').doc(`${this.boardId}`)
            .collection('boardCards');

          /*      this.columnsColl =  this.afs
           .collection(`column`).doc(`${user.uid}`)
           .collection('userColumn')*/
          this.cardURL = `cards/${user.uid}/userCards/`
          this.boardss = this.boardsCollection.snapshotChanges().map(changes => {
            return changes.map(a => {
              const data = a.payload.doc.data() as Board;
              data.id = a.payload.doc.id;
              return data;
            });
          });
          return this.boardss

        } else {
          return Observable.of(null)
        }
      });
  }

  boardIdDD(boardId: string) {
    this.boardId = boardId

  }

  changeBoardTitle(id: string,date, title: string) {
    console.log('DDDDDDDDDDDDDDDDDDDDate',date)
    let board: Board = {
      id: id,
      date: date,
      title: title
    }
    this.boardsCollection.doc(`${id}`).set(board)
  }

  addBoard(board: Board) {
    this.boardsCollection.add(board);
  }

  deleteBoard(boardId: string) {
    this.boardId = boardId;
    /* this.boardDoc = this.afs.doc(this.URL+`${this.boardId}`)
     this.cardDoc = this.afs.doc(this.cardURL+`${this.boardId}`)*/
    this.boardsCollection.doc(`${this.boardId}`).delete();
    this.columnsCollection.doc(`${this.boardId}`).delete();
    this.cardsCollection.doc(`${this.boardId}`).delete();

    /*this.boardDoc.delete();
     this.cardDoc.delete();*/

    this.columnService.deleteColumnId()
  }

  getCurrentBoard(board: Board) {
    this.boardId = board.id
    this.boards.subscribe(boards => {
      let boardd = boards.filter(board => board.id === this.boardId);
      this.currentBoard = boardd;
      console.log('currentBoard', this.currentBoard[0].title)
    });


    /*    let boardd = this.boards.filter(  board => board.id === this.board.id);
     this.currentBoard = boardd[0];
     console.log
     this.subject.next(boardd[0]);
     return boardd[0];*/
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }


  getUserBoards(): Observable<Board[]> {
    return this.boards
  }
}
