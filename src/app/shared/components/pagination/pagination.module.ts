import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, MaterialModule],
  exports: [PaginationComponent],
})
export class PaginationModule {}
