import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.canLoad();
  }

  canLoad(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      tap(async () => {
        if (!this.authService.token) {
          // リロード等によるtokenの消失時もloginへ
          await this.authService.logOut();
        }
      }),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
