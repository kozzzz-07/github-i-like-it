import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { MainNavComponent } from './main-nav/main-nav.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [MainNavComponent],
  exports: [MainNavComponent],
})
export class SharedModule {}
