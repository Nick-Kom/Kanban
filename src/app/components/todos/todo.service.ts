import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Todo} from './todo';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class TodoService {
  cardId: string;
  boardId: string;
  todos: any;
  todoss: any;
  todosCollection: AngularFirestoreCollection<Todo>;

  constructor(private auth: AngularFireAuth,
              private afs: AngularFirestore) {
    this.todos = this.auth.authState
      .switchMap(user => {
        if (user) {
          this.todosCollection = this.afs
            .collection(`boards`).doc(`${user.uid}`)
            .collection('userBoards').doc(`${this.boardId}`)
            .collection('boardTodos');

          this.todoss = this.todosCollection.snapshotChanges().map(changes => {
            return changes.map(a => {
              const data = a.payload.doc.data() as Todo;
              data.id = a.payload.doc.id;
              return data;
            });
          });
          return this.todoss
        } else {
          return Observable.of(null)
        }
      });


  }

  getBoardId(boardId: string) {
    this.boardId = boardId;
  }

  getTodos() {
    return this.todos
  }

  createTodo(todo: Todo) {
    this.todosCollection.add(todo)
  }

  deleteTodo(todo: Todo) {
    this.todosCollection.doc(`${todo.id}`).delete();

  }

  toggleTodo(todo: Todo) {
    this.todosCollection.doc(`${todo.id}`).set(todo);
  }


}
