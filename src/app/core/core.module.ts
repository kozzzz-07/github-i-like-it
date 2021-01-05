import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from '../feature-modules/example/authorizationInterceptor';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [MainNavComponent],
  exports: [MainNavComponent],
  // TODO: exampleから読み込んでるので、auth用に作成したら切り替える
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
