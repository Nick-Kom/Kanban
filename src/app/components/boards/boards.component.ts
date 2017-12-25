import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from "../../services/user.service";
import {BoardsService} from "../../services/boards.service";
import {Board} from "./board/board";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertConfirmDeleting} from "../modal/alert-confirm/alert-confirm-deleting";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.less', '../../styles/btn.less', '../../styles/alert.less']
})
export class BoardsComponent implements OnInit {
  user: any;
  boards: Board[];
  titleForm: FormGroup;
  newEmptyBoardTitle: boolean ;

  constructor(public af: AngularFireAuth, private router: Router,
              private userService: UserService,
              private boardsService: BoardsService,
              private dialog : MatDialog,
              private formBuilder: FormBuilder) {
    this.titleForm = this.formBuilder.group({
      title: ['',
        [Validators.required,
          Validators.maxLength(40)
        ]]
    });

  }

  ngOnInit() {
    this.user = this.userService.user
    console.log('this.user', this.user)
    this.boardsService.getUserBoards().subscribe(boards => {
      this.boards = boards
      console.log(boards);
    });
  }

  openBoard(board: any) {
    this.router.navigate(['/board', board.id]);

  }

  saveBoardTitle(board:Board) {
    this.boardsService.changeBoardTitle(board.id,board.date, this.titleForm.value.title)
    this.newEmptyBoardTitle = true;
    this.titleForm = this.formBuilder.group({
      title: ['',
        [Validators.required,
          Validators.maxLength(40)
        ]]
    });
  }

  createBoard() {
    let board: Board = {
      id: '',
      date: new Date,
      title: ''
    }
    this.boardsService.addBoard(board)
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
