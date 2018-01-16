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
  styleUrls: ['./board-item.component.less',  '../../../styles/alert.less']
})
export class BoardItemComponent implements OnInit {
  @Input() board:Board;
  titleForm:FormGroup;
  showEditBoardTitle:boolean = false;
  spacesValidation:boolean = false;
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
          Validators.maxLength(50)
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
    if ( /\S/.test(this.titleForm.value.title) ) {
      this.spacesValidation = false;
      this.showEditBoardTitle = false;
      this.boardsService.changeBoardTitle(board.id, board.date, this.titleForm.value.title)
    } else {
      this.spacesValidation = true;
    }
  }

  hideChangingBoardTitle(){
    this.showEditBoardTitle = false;
    this.titleForm = this.formBuilder.group({
      title: [this.board ? this.board.title : '',
        [Validators.required,
          Validators.maxLength(50)
        ]]
    });
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
