import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarsPageComponent } from './components/page/stars.page';
import { StarsRoutingModule } from './stars-routing.module';
import { ListContainerComponent } from './components/containers/list/list.container';
import { ItemPresentationalComponent } from './components/presentations/item/item.presentational';
import { MaterialModule } from 'src/app/shared/material.module';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';
import { SubheaderComponent } from './components/presentations/subheader/subheader.component';
import { CollapsibleErrorAreaModule } from 'src/app/shared/components/collapsible-error-area/collapsible-error-area.module';

@NgModule({
  declarations: [
    StarsPageComponent,
    ListContainerComponent,
    ItemPresentationalComponent,
    SubheaderComponent,
  ],
  imports: [
    CommonModule,
    StarsRoutingModule,
    MaterialModule,
    PaginationModule,
    CollapsibleErrorAreaModule,
  ],
})
export class StarsModule {}
