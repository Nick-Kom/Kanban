import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {AngularFirestoreDocument, AngularFirestore} from "angularfire2/firestore";

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  error: any;
  email :string;
  nickname:string;
  password:string;

  constructor(public afAuth: AngularFireAuth,
              public  afs: AngularFirestore,
              private router: Router) {
    this.afAuth.auth.onAuthStateChanged(auth => {
      if(auth) {
        this.router.navigateByUrl('/boards');
      }
    });
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((success) => {
      console.log(success.user)
        this.updateUserData(success.user)
        this.router.navigate(['/boards']);
      }).catch(
      (err) => {
        this.error = err;
      });
  }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.afAuth.auth.signInWithEmailAndPassword(
        formData.value.email, formData.value.password).then(
        (success) => {
          console.log(success);

          this.router.navigate(['/boards']);
        }).catch(
        (err) => {
          console.log(err);
          this.error = err;
        })
    }
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    return userRef.set(data)
  }


  ngOnInit() {
  }

}
