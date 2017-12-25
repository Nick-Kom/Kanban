import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {BoardsService} from "../../services/boards.service";
import {User} from "firebase";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  name1: any;
  user: any;
  constructor(public af: AngularFireAuth, private router: Router,
              private userService: UserService,
              private boardsService: BoardsService) {
    this.af.auth.onAuthStateChanged(auth => {
      if (auth) {
        this.name1 = auth;
        console.log(this.name1)
      }
    });
  }

  ngOnInit() {
    this.user = this.userService.getUser().subscribe(user => {
      this.user = user
      console.log('User',this.user)
    });

  }
  logout() {
    this.af.auth.signOut();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }
}
