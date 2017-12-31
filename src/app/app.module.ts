import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {MaterialModule} from "./material-module/material.module";
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {ItemsComponent} from './components/items/items.component';
import 'hammerjs';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {BoardsComponent} from './components/boards/boards.component';
import {routes} from "./app.routes";
import {AngularFireAuthModule} from "angularfire2/auth";
import {UserService} from "./services/user.service";
import {ItemService} from "./services/item.service";
import {SortablejsModule} from "angular-sortablejs";
import {BoardsService} from "./services/boards.service";
import {BoardComponent} from './components/boards/board/board.component';
import {ColumnsComponent} from './components/columns/columns.component';
import {ColumnService} from "./services/column.service";
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {CardsComponent} from './components/cards/cards.component';
import {ColumnItemComponent} from "./components/columns/column-item/column-item.component";
import {CardService} from "./services/card.service";
import {CardItemComponent} from "./components/cards/card-item/card-item.component";
import {DragulaModule} from "ng2-dragula";
import {FileDropDirective} from "./components/columns/column-item/file-drop.directive";
import {AlertConfirmDeleting} from "./components/modal/alert-confirm/alert-confirm-deleting";
import {CardDialog} from "./components/modal/card-dialog/card-dialog";
import {TodoFormComponent} from "./components/todos/todo-form/todo-form.component";
import {firebaseConfig} from "./firebase-config";
import { DndModule } from 'ng2-dnd';
import { BoardAddFormComponent } from './components/boards/board-add-form/board-add-form.component';
import { BoardItemComponent } from './components/boards/board-item/board-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardsComponent,
    ItemsComponent,
    SignupComponent,
    BoardComponent,
    ColumnsComponent,
    ToolbarComponent,
    CardsComponent,
    ColumnItemComponent,
    CardItemComponent,
    FileDropDirective,
    AlertConfirmDeleting,
    CardDialog,
    TodoFormComponent,
    BoardAddFormComponent,
    BoardItemComponent
  ],
  entryComponents: [AlertConfirmDeleting, CardDialog],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    SortablejsModule.forRoot({animation: 150}),
    DragulaModule,
    ReactiveFormsModule,
    DndModule.forRoot()
  ],
  providers: [
    UserService,
    ItemService,
    BoardsService,
    ColumnService,
    CardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
