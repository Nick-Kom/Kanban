import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Board} from "../board/board";
import {BoardsService} from "../../../services/boards.service";
import {AlertConfirmDeleting} from "../../modal/alert-confirm/alert-confirm-deleting";

@Component({
  selector: 'board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.less']
})
export class BoardItemComponent implements OnInit {
  @Input() board:Board;
  titleForm:FormGroup;
  showEditBoardTitle:boolean = false;
  constructor(
              private router: Router,
              private boardsService: BoardsService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.titleForm = this.formBuilder.group({
      title: [this.board ? this.board.title : '',
        [Validators.required,
          Validators.maxLength(40)
        ]]
    });
  }

  openBoard(board: any) {
    this.router.navigate(['/board', board.id]);
  }

  editBoardTitle(){
    this.showEditBoardTitle = true;
  }

  saveEditedBoardTitle(board: Board) {
    this.showEditBoardTitle = false;
    this.boardsService.changeBoardTitle(board.id, board.date, this.titleForm.value.title)
  }

  hideChangingBoardTitle(){
    this.showEditBoardTitle = false;
  }

  openDialog(board: Board) {
    let dialogRef = this.dialog.open(AlertConfirmDeleting);
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res && res.delete) {
        this.boardsService.deleteBoard(board.id)
      }
    })
  }

}
