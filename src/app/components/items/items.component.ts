import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import {Item} from "./items";
import {AngularFireAuth} from "angularfire2/auth";
import {SortablejsOptions} from "angular-sortablejs";
import {UserService} from "../../services/user.service";
import {User} from "firebase";


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;
  name: any;
  userid: any;
  booksByStoreID: any;
  itemms: Array<string> = ['item1', 'item2', 'item3'];

  options: SortablejsOptions = {
    group: 'itemms',
    animation: 150,
    onEnd: (evt) => {
      console.log(this.items)
      // this.updateItems(this.items);
    },
  };

  constructor(public af: AngularFireAuth,
              private itemService: ItemService,
              private userService: UserService) {

    /*    this.af.auth.onAuthStateChanged(auth => {
     if (auth) {
     this.name = auth;

     console.log('user',this.name)
     }
     });*/

  }

  ngOnInit() {
    this.userService.getUser().subscribe((user: User) => {
      this.userid = user.uid
      console.log('In Items USER id', this.userid  )
    })
    this.itemService.getItems().subscribe((items: Item[]) => {
      this.items = items;
    });
  }

}
