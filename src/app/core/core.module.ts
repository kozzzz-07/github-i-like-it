import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [MainNavComponent],
  exports: [MainNavComponent],
})
export class CoreModule {}
