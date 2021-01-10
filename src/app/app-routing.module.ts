import { LoginComponent } from './feature-modules/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { MainNavComponent } from './core/components/main-nav/main-nav.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [],
  },
  {
    path: '',
    component: MainNavComponent,
    // canActivate: [],
    // canLoad: [],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./feature-modules/list/list.module').then(
            (m) => m.ListModule
          ),
      },
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
