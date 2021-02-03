import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarsPageComponent } from './components/page/stars.page';
import { StarsRoutingModule } from './stars-routing.module';
import { ListContainerComponent } from './components/containers/list/list.container';
import { ItemPresentationalComponent } from './components/presentations/item/item.presentational';
import { MaterialModule } from 'src/app/shared/material.module';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';

@NgModule({
  declarations: [
    StarsPageComponent,
    ListContainerComponent,
    ItemPresentationalComponent,
  ],
  imports: [CommonModule, StarsRoutingModule, MaterialModule, PaginationModule],
})
export class StarsModule {}
