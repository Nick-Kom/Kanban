import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ColumnService} from "../../../services/column.service";
import {BoardsService} from "../../../services/boards.service";
import {Board} from "./board";
import {CardService} from "../../../services/card.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AlertConfirmDeleting} from "../../modal/alert-confirm/alert-confirm-deleting";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less', '../../../styles/alert.less']
})
export class BoardComponent implements OnInit {
  board: any;
  boards: Board[];
  boardId: any;
  boardName: string;
  changeTitle: boolean = true;
  titleForm: FormGroup;
  boardDate: Date;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private columnService: ColumnService,
              private cardService: CardService,
              private dialog : MatDialog,
              private boardsService: BoardsService) {

  }

  ngOnInit() {

    this.route.params
      .subscribe((params) => {
        this.boardId = params.id
        this.columnService.getId(params.id);
        this.cardService.getBoardId(params.id);
        this.boardsService.boardIdDD(params.id);
      });

    console.log('BBBoarddd', this.boardName)

    this.boardsService.getUserBoards().subscribe(
      boards => {
        this.boards = boards
        this.board = this.boards.filter(board => board.id == this.boardId)


        this.getCurrentBoard(this.board[0])
      });
    console.log('Finali ID', this.boardId)
    this.titleForm = this.formBuilder.group({
      title: [this.boardName,
        [Validators.required,
          Validators.maxLength(40)
        ]]
    });

  }

  editBoardTitle() {
    this.changeTitle = false;
  }

  saveBoardTitle(date:Date) {
    this.boardsService.changeBoardTitle(this.boardId,date, this.titleForm.value.title)
    this.changeTitle = true;
  }

  getCurrentBoard(board: Board) {
    //this.boardsService.getCurrentBoard(board);
    if (board) {
      this.boardName = board.title;
      this.boardDate = board.date;
      this.titleForm = this.formBuilder.group({
        title: [this.boardName,
          [Validators.required,
            Validators.maxLength(40)
          ]]
      });
    }
    else {
      this.router.navigate(['/boards']);
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(AlertConfirmDeleting);
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res && res.delete) {

        this.boardsService.deleteBoard(this.boardId)
        this.router.navigate(['/boards']);
      }
    })

  }

}
