import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchPageComponent } from './components/page/search.page';
import { ListContainerComponent } from './components/containers/list/list.container';
import { ItemComponent } from './components/presentations/item/item.component';
import { SubheaderComponent } from './components/presentations/subheader/subheader.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    ListContainerComponent,
    ItemComponent,
    SubheaderComponent,
  ],
  imports: [CommonModule, SearchRoutingModule],
})
export class SearchModule {}
