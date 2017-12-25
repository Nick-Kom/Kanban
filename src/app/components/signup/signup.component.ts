import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  state: string = '';
  error: any;

  constructor(public af: AngularFireAuth, private router: Router,
 private userService: UserService) {
  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.af.auth.createUserWithEmailAndPassword(
        formData.value.email, formData.value.password)
        .then(
          (success) => {
            console.log('Success',success );
            this.userService.addUserData(success,formData.value.nickname)
            this.router.navigate(['/boards'])
          }).catch(
        (err) => {
          console.log(err);
          this.error = err;
        })
    }
  }


  ngOnInit() {
  }

}
