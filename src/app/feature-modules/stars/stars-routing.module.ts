import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarsPageComponent } from './components/page/stars.page';

const routes: Routes = [
  {
    path: 'stars',
    component: StarsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StarsRoutingModule {}
