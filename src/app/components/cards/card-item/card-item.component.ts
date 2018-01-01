import {Component, HostListener, Input} from '@angular/core';
import {Card} from "../card";
import {CardService} from "../../../services/card.service";
import {SortablejsOptions} from "angular-sortablejs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {AlertConfirmDeleting} from "../../modal/alert-confirm/alert-confirm-deleting";
import {CardDialog} from "../../modal/card-dialog/card-dialog";
import {DragulaService} from "ng2-dragula";
import {TodoService} from "../../todos/todo.service";
import {Todo} from "../../todos/todo";


@Component({
  selector: 'card-item',
  templateUrl: 'card-item.template.html',
  styleUrls: ['card-item.less']
})
export class CardItemComponent {
  @Input() card: Card;
  // @Output() onDeleteCard = new EventEmitter;
  cardTitle: boolean = false;
  cardDescription: boolean = false;
  cardDatesTimes: boolean = false;
  titleForm: FormGroup;
  descriptionForm: FormGroup;
  animal: string;
  name: string;
  todosLength: number;
  draggedCard: Card;
  dragBackground: boolean = false
  todos:Todo[];
  completedTodos:Todo[];
  constructor(private cardService: CardService,
              private todoService: TodoService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {

  }



  ngOnInit() {
    this.titleForm = this.formBuilder.group({
      title: [this.card ? this.card.title : '',
        [Validators.required,
          Validators.maxLength(40)
        ]]
    });
    this.descriptionForm = this.formBuilder.group({
      description: [this.card ? this.card.description : '',
        [Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500)
        ]]
    });

    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      this.todos = todos.filter(todo => todo.cardId == this.card.id);
      this.todosLength = this.todos.length
      this.completedTodos = this.todos.filter(todo => todo.completed === true);
    });

  }


  onDrag(event:any){

  //  this.dragBackground = true
  }
  changeCardTitle() {
    this.cardTitle = true;
  }

  changeCardDescription() {
    this.cardDescription = true;
  }

  saveCardTitle(cardFormGroup: any) {
    let card: Card = {
      id: this.card.id,
      position: this.card.position,
      columnId: this.card.columnId,
      title: cardFormGroup.title,
      description: cardFormGroup.description
    };
    this.cardService.changeCardTitle(card)
    this.cardTitle = false;
  }

  saveCardDescription() {
    let card: Card = {
      id: this.card.id,
      position: this.card.position,
      columnId: this.card.columnId,
      title: this.card.title,
      description: this.titleForm.value.description
    };
    this.cardDescription = false;
    this.cardService.changeCardTitle(card)
  }

  clearCardTitle() {
    this.cardTitle = false;
  }

  clearCardDescription() {
    this.cardDescription = false;
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(CardDialog, {
      width: '450px',
      data: {title: this.card.title, card: this.card, description: this.card.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.saveCardTitle(result)
      }


    });
  }


}
