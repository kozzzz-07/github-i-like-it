import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavComponent } from './core/main-nav/main-nav.component';

const routes: Routes = [
  {
    path: '',
    component: MainNavComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./feature-modules/example/example.module').then(
            (m) => m.ExampleModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
