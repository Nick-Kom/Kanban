import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {BoardsService} from "../../services/boards.service";
import {Board} from "./board/board";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.less', '../../styles/btn.less']
})
export class BoardsComponent implements OnInit {
  user: any;
  boards: Board[];
  newBoard: boolean = false;

  constructor(private userService: UserService,
              private boardsService: BoardsService) {

  }

  ngOnInit() {
    this.user = this.userService.user
    console.log('this.user', this.user)
    this.boardsService.getUserBoards().subscribe(boards => {
      this.boards = boards
      console.log(boards);
    });
  }

  showCreateBoard() {
    this.newBoard = true;
  }

  hideBoardTitle(event) {
    this.newBoard = event;
  }

  createBoard(event) {
    this.newBoard = event;
  }
}
