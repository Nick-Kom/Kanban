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

  /*  options: SortablejsOptions = {
   group: 'cards',
   draggable: ".item",
   animation: 150,
   onEnd: (evt) => {
   console.log('onEnd', evt)
   let idColumnFrom = evt.from.id;
   let idColumnTo = evt.to.id;
   /!*  let values = []

   let arrOfCardPositionsTakenColumn = evt.path//[1].children;
   for (const key in arrOfCardPositionsTakenColumn) {
   /!*       let keyNumber = parseInt(key)
   if(typeof(keyNumber)== "number")  *!/   values.push(key)
   }
   console.log(`ArrCards: `, arrOfCardPositionsTakenColumn);
   let cardss = this.cards
   let cardId = evt.item.dataset.id*!/
   /!*if(cardId !== evt.to.children[1].dataset.id){
   console.log('We Have Card in last position',evt.to.children[1].dataset.id)
   var carsNewPositions = cardss.map((card,i,arr)=>{
   if(card.id == cardId) {
   card.position = 0
   }  if(card.id !== cardId) {
   card.position = card.position + 1}
   return card
   },[])
   }*!/

   if (evt.to.id !== evt.from.id) {
   this.cardForDelete = {
   id: evt.from.dataset.id,
   title: evt.from.dataset.title,
   description: evt.from.dataset.description,
   date: new Date(2017, 11, 16),
   columnId: idColumnFrom,
   position: parseInt(evt.from.dataset.position)
   }

   this.draggedCard = {
   id: evt.from.dataset.id,
   title: evt.from.dataset.title,
   description: evt.from.dataset.description,
   date: new Date(2017, 11, 16),
   columnId: idColumnTo,
   position: parseInt(evt.from.dataset.position)
   }
   console.log(`cardForDelete: `, this.cardForDelete);
   console.log(`this.draggedCard: `, this.draggedCard);
   console.log(`idColumnTo: `, idColumnTo);
   console.log(`idColumnFrom: `, idColumnFrom);

   if (this.cardForDelete.columnId !== this.draggedCard.columnId) {
   this.cardService.getCurrentCard(this.draggedCard, this.cardForDelete)
   }
   }
   }
   };*/

  constructor(private cardService: CardService,
              private formBuilder: FormBuilder,
              private dragulaService: DragulaService) {

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

  onMove(card: Card, cards: Card[], position: number, columnId) {
    let dragCardColumnId = card.columnId
    console.log(card);
    console.log(position);
    console.log(cards);

  // let cardFromAnotherColumn = cards.find(card => card.columnId !== dragCardColumnId);
   // console.log(cardFromAnotherColumn)
    if ( columnId !== dragCardColumnId) {
      console.log('cardForDelete',card );
      console.log('columnId', columnId);
       this.cardService.getCurrentCard(card,  columnId, position)
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
