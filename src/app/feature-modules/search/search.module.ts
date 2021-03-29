import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchPageComponent } from './components/page/search.page';
import { ListContainerComponent } from './components/containers/list/list.container';
import { ItemComponent } from './components/presentations/item/item.component';
import { SubheaderComponent } from './components/presentations/subheader/subheader.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';
import { CollapsibleErrorAreaModule } from 'src/app/shared/components/collapsible-error-area/collapsible-error-area.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SearchPageComponent,
    ListContainerComponent,
    ItemComponent,
    SubheaderComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MaterialModule,
    PaginationModule,
    CollapsibleErrorAreaModule,
    FormsModule,
  ],
})
export class SearchModule {}
