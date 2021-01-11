import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { QueryOptions } from '@apollo/client/core/watchQueryOptions';
import { Apollo, gql } from 'apollo-angular';
import firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  private token = '';
  private _user$ = new BehaviorSubject<User>({});

  constructor(
    private auth: AngularFireAuth,
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  getToken(): string {
    return this.token;
  }

  get user$(): Observable<User> {
    return this._user$.asObservable();
  }

  async login(): Promise<void> {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');

    try {
      const userCredential = await this.auth.signInWithPopup(provider);

      const avatarUrl = (userCredential.additionalUserInfo?.profile as Profile)
        .avatar_url;
      const userName = userCredential.additionalUserInfo?.username || '';

      this._user$.next({ avatarUrl, userName });

      // MEMO: 型が合わないので強制変換
      const additionalUserInfo = (userCredential.credential as unknown) as OAuthCredential;
      this.token = additionalUserInfo.accessToken;
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
    try {
      await this.auth.signOut();
      this._user$.next({});
      this.token = '';
    } catch (e) {}
  }

  // 疎通
  query(): Observable<ApolloQueryResult<Viewer>> {
    const ME = gql`
      query {
        viewer {
          login
        }
      }
    `;

    const options: QueryOptions = {
      query: ME,
    };
    return this.apollo.query(options);
  }

  // 疎通
  query2(): Observable<any> {
    const url = 'https://api.github.com/user/repos';
    return this.http.get(url);
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

interface User {
  userName?: string;
  avatarUrl?: string;
}

interface Viewer {
  viewer: {
    login: string;
  };
}
