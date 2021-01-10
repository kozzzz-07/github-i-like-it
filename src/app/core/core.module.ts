import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { AUTHORIZATION_INTERCEPTOR } from './interceptors';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [MainNavComponent],
  exports: [MainNavComponent],
  providers: [AUTHORIZATION_INTERCEPTOR],
})
export class CoreModule {}
