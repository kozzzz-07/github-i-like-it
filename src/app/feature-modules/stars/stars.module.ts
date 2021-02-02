import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './components/page/list.page';
import { StarsRoutingModule } from './stars-routing.module';
import { ListContainerComponent } from './components/containers/list/list.container';
import { ListPresentationComponent } from './components/presentations/list/list.presentation';
import { MaterialModule } from 'src/app/shared/material.module';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';

@NgModule({
  declarations: [
    ListPageComponent,
    ListContainerComponent,
    ListPresentationComponent,
  ],
  imports: [CommonModule, StarsRoutingModule, MaterialModule, PaginationModule],
})
export class StarsModule {}
