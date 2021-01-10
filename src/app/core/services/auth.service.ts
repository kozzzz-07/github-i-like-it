import { map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly isLoggedIn$ = this.afAuth.authState.pipe(map((user) => !!user));
  readonly isLoggedOut$ = this.isLoggedIn$.pipe(
    map((isLoggedIn) => !isLoggedIn)
  );
  readonly user$ = new BehaviorSubject<User | null>(null);
  #accessToken = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  get token(): string {
    return this.#accessToken;
  }

  set token(token: string) {
    this.#accessToken = token;
  }

  async logOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.removeToken();
      this.router.navigateByUrl('/login');
    } catch (e) {
      console.error(e);
    }
  }

  private removeToken(): void {
    this.#accessToken = '';
  }

  getUser(): void {
    this.afAuth.authState
      .pipe(tap((data) => console.log({ data })))
      .subscribe((user) => {
        this.user$.next({
          displayName: user?.displayName,
          photoURL: user?.photoURL,
        });
      });
  }
}
