import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable} from "@angular/core";
import * as firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'


interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}
interface Board {
  title: string;
}

@Injectable()
export class UserService  implements CanActivate {
  user: Observable<User>;
  boards: Observable<Board>;

  constructor(private auth: AngularFireAuth,
              private router: Router,
              private afs: AngularFirestore) {
    this.user = this.auth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.collection('users').doc(`${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
      })    ;

  }


  addUserData(user,nickname ) {
    let userRef : AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: nickname,
      photoURL: user.photoURL
    }
    return userRef.set(data)
  }

  canActivate(): Observable<boolean> {
    return Observable.from(this.auth.authState)
      .take(1)
      .map(state => !!state)
      .do(authenticated => {
        if
        (!authenticated) this.router.navigate(['/login']);
      })
  }

  getUser(){
    return  this.user
  }

}
