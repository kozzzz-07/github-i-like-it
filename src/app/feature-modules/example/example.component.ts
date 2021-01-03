import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {
  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  async login(): Promise<void> {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');

    try {
      const userCredential = await this.auth.signInWithPopup(
        provider
      );

      const avatarUrl = (userCredential.additionalUserInfo?.profile as Profile).avatar_url;
      const username = userCredential.additionalUserInfo?.username;

      // MEMO: 型が合わないので強制変換
      const additionalUserInfo = userCredential.additionalUserInfo as unknown as OAuthCredential;
      const token = additionalUserInfo.accessToken;


    } catch (e) {
      // Handle Errors here.
      const errorCode = e.code;
      const errorMessage = e.message;
      // The email of the user's account used.
      const email = e.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = e.credential;

      console.error({ errorCode, errorMessage, email, credential });
    }
  }

  async logout(): Promise<void> {
    this.auth.signOut();
  }
}

interface OAuthCredential {
  accessToken: string;
  providerId: string;
  signInMethod: string;
}

interface Profile {
  avatar_url: string;
}
