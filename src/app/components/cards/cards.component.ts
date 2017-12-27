import {Component, HostListener, OnInit} from '@angular/core';
import {CardService} from "../../services/card.service";
import {Card} from "./card";
import {SortablejsOptions} from "angular-sortablejs";
import {DragulaService} from "ng2-dragula";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.less']
})
export class CardsComponent implements OnInit {
  cards: Card[];
  draggedCard: Card;
  cardForDelete: Card;
  columnId: string;
  newCard: boolean = false;
  titleForm: FormGroup;
  numberOfCards = [];
  hideGhostCard: boolean = true;

  options: SortablejsOptions = {
    group: 'cards',
    draggable: ".item",
    animation: 150,
    onEnd: (evt) => {
      console.log('onEnd', evt)
      let idColumnFrom = evt.from.id;
      let idColumnTo = evt.to.id;
      let cardss = evt.to.dataset.cards;
      console.log(`Cards: `, JSON.parse(cardss))
      console.log(`Cards: `, this.cards)

      if (evt.to.id !== evt.from.id) {
        this.cardForDelete = {
          id: evt.from.dataset.id,
          title: evt.from.dataset.title,
          description: evt.from.dataset.description,
          columnId: idColumnFrom,
          position: parseInt(evt.from.dataset.position)
        }

        this.draggedCard = {
          id: evt.from.dataset.id,
          title: evt.from.dataset.title,
          description: evt.from.dataset.description,
          columnId: idColumnTo,
          position: parseInt(evt.from.dataset.position)
        }
        /*console.log(`cardForDelete: `, this.cardForDelete);
         console.log(`this.draggedCard: `, this.draggedCard);
         console.log(`idColumnTo: `, idColumnTo);
         console.log(`idColumnFrom: `, idColumnFrom);*/


        if (this.cardForDelete.columnId !== this.draggedCard.columnId) {
          this.cardService.getCurrentCard(this.cardForDelete, this.draggedCard)
        }
      }
    }
  };

  constructor(private cardService: CardService,
              private formBuilder: FormBuilder,
              private dragulaService: DragulaService) {
    /*    this.cards.valueChanges.subscribe(() => {
     console.log(this.cards.value);
     });*/
  }

  ngOnInit() {
    this.titleForm = this.formBuilder.group({
      title: ['',
        [
          Validators.maxLength(40)
        ]]
    });

    this.columnId = this.cardService.colunnId();
    this.cardService.getCards().subscribe((cards: Card[]) => {
      this.cards = cards.filter(card => card.columnId === this.columnId);
      console.log(this.cards)
      if (this.cards.length > 0) this.hideGhostCard = false;
      if (this.cards.length == 0) this.hideGhostCard = true;
    });


  }
  @HostListener('drop', ['$event'])
  onDrop($event) {

  }
  onMove(card: Card, cards: Card[], position: number, columnId) {

    let dragCardColumnId = card.columnId
    console.log(card);
    console.log(position);
    console.log(cards);

    // let cardFromAnotherColumn = cards.find(card => card.columnId !== dragCardColumnId);
    // console.log(cardFromAnotherColumn)
    if (columnId !== dragCardColumnId) {
      console.log('cardForDelete', card);
      console.log('columnId', columnId);
      let draggedCardFromAnotherColumn = {
        id: card.id,
        title: card.title,
        description: card.description,
        columnId: columnId,
        position: position
      }
      console.log(draggedCardFromAnotherColumn)

      let index = cards.findIndex((card1) => {
        return card1.id === card.id;
      })
      console.log(index)

      cards[index].columnId = columnId

      let orderedCards = cards.map((orderedCard, i) => {
        orderedCard.position = i;
        return orderedCard;
      }, []);
      console.log(orderedCards)

      orderedCards.forEach((card) => {
        console.log(card);
        this.cardService.changeCardTitle(card)
      });
      //this.cardService.deleteCard(card)


    } else {
      let orderedCards = cards.map((orderedCard, i) => {
        orderedCard.position = i;
        return orderedCard;
      }, []);
      console.log(orderedCards)

      orderedCards.forEach((card) => {
        console.log(card);
        this.cardService.changeCardTitle(card)
      });
    }
  }



  createCard() {
    this.newCard = true;
  }

  saveCardTitle() {

    this.newCard = false;
    var newPosition
    let lastCardIndex = this.cards.length - 1
    if (lastCardIndex >= 0) {
      console.log('LastCard', this.cards[lastCardIndex])
      newPosition = lastCardIndex + 1
    }
    else {
      newPosition = 0
    }
    let card: Card = {
      columnId: this.columnId,
      position: newPosition,
      title: this.titleForm.value.title,
      description: ''
    }
    this.cardService.addCard(card)

  }

  clearCardTitle() {
    this.newCard = false;
  }


}
