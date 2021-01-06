import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = true;
  ui: firebaseui.auth.AuthUI | undefined;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnDestroy(): void {
    this.ui?.delete();
  }

  ngOnInit(): void {
    const uiConfig: firebaseui.auth.Config = {
      signInOptions: [
        {
          provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
          scopes: ['repo'],
        },
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this),
        uiShown: () => {
          this.isLoading = false;
        },
      },
    };

    this.afAuth.app.then((app) => {
      this.ui = new firebaseui.auth.AuthUI(app.auth());
      this.ui.start('#firebaseui-auth-container', uiConfig);
    });
  }

  onLoginSuccessful(authResult: firebase.auth.UserCredential): boolean {
    console.log(authResult);
    this.ngZone.run(() => {
      this.router.navigateByUrl('/list');
    });

    return false;
  }
}
