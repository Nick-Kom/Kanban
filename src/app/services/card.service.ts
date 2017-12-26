import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireAuth} from "angularfire2/auth";
import {Card} from "../components/cards/card";
import {Column} from "../components/columns/column";
import {fbind} from "q";

@Injectable()
export class CardService {
  cards: any;
  columnId: string;
  boardId: string;
  cardId: string;
  arrOfCards: any;
  arrOfCardsCoosen: boolean = true;
  cardss: any;
  changePositionCard: Date;
  changePositionCardId: string;
  cardsCollection: AngularFirestoreCollection<Card>;
  cardDoc: AngularFirestoreDocument<Card>;

  constructor(private auth: AngularFireAuth,
              private afs: AngularFirestore) {
    this.cards = this.auth.authState
      .switchMap(user => {
        if (user) {
          this.cardsCollection = this.afs
            .collection(`boards`).doc(`${user.uid}`)
            .collection('userBoards').doc(`${this.boardId}`)
            .collection('boardCards', ref => ref.orderBy('position'));

          this.cardss = this.cardsCollection.snapshotChanges().map(changes => {
            return changes.map(a => {
              const data = a.payload.doc.data() as Card;
              data.id = a.payload.doc.id;
              return data;
            });
          });
          return this.cardss
        } else {
          return Observable.of(null)
        }
      });


  }

  getCards() {
    return this.cards
  }

  getCardChangetPosition(card: Card) {

    this.changePositionCard = card.date
    this.changePositionCardId = card.id
    //this.cardsCollection.doc(`${this.cardId}`).set(card)
  }

  numberOfCards(cards: any) {
    this.arrOfCards = cards
  }

  numberOfCardsCoosen() {
    this.arrOfCardsCoosen = true
    console.log('arrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrOfCardsCCCCCCHHHHH', this.arrOfCardsCoosen)
  }

  getDraggedCard(card:Card) {

  }


  getCurrentCard(card: Card, columnId: string, position: number) {
   this.deleteCard(card)
      let draggedCard = {
        id: card.id,
        title: card.title,
        description: card.description,
        columnId: columnId,
        position: position
      }
   this.addCard(draggedCard)



  }

  getColumnId(columnId: string) {
    this.columnId = columnId;
    console.log('ColumnId', this.columnId)
  }

  colunnId() {
    return this.columnId
  }

  /*  getCardId(cardId: string) {
   this.cardId = cardId;
   }*/

  getBoardId(boardId: string) {
    this.boardId = boardId;
  }

  addCard(card: Card) {
    this.cardsCollection.add(card);
  }

  changeCardTitle(card: Card) {
    this.cardsCollection.doc(`${card.id}`).set(card)
  }

  deleteCard(card: Card) {
    this.cardId = card.id;

    this.cardsCollection.doc(`${this.cardId}`).delete();
  }

}
