import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ui: firebaseui.auth.AuthUI | undefined;

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    const uiConfig: firebaseui.auth.Config = {
      signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this),
      },
    };

    this.afAuth.app.then((app) => {
      this.ui = new firebaseui.auth.AuthUI(app.auth());
      this.ui.start('#firebaseui-auth-container', uiConfig);
    });
  }

  onLoginSuccessful(): boolean {
    return true;
  }
}
