import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapsibleErrorAreaComponent } from './collapsible-error-area.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [CollapsibleErrorAreaComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CollapsibleErrorAreaComponent],
})
export class CollapsibleErrorAreaModule {}
