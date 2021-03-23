import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchPageComponent } from './components/page/search.page';
import { ListContainerComponent } from './components/containers/list/list.container';

@NgModule({
  declarations: [SearchPageComponent, ListContainerComponent],
  imports: [CommonModule, SearchRoutingModule],
})
export class SearchModule {}
