import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './components/page/list.page';
import { ListRoutingModule } from './list-routing.module';
import { ListContainerComponent } from './components/containers/list/list.container';
import { ListPresentationComponent } from './components/presentations/list/list.presentation';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [
    ListPageComponent,
    ListContainerComponent,
    ListPresentationComponent,
  ],
  imports: [CommonModule, ListRoutingModule, MaterialModule],
})
export class ListModule {}
