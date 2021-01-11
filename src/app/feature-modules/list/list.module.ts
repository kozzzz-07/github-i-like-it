import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './components/page/list.page';
import { ListRoutingModule } from './list-routing.module';

@NgModule({
  declarations: [ListPageComponent],
  imports: [CommonModule, ListRoutingModule],
})
export class ListModule {}
