import { LoginComponent } from './feature-modules/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavComponent } from './core/components/main-nav/main-nav.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AppGuard } from './core/guards/app.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: MainNavComponent,
    canActivate: [AppGuard],
    canLoad: [AppGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./feature-modules/search/search.module').then(
            (m) => m.SearchModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./feature-modules/stars/stars.module').then(
            (m) => m.StarsModule
          ),
      },
      // {
      //   path: '',
      //   loadChildren: () =>
      //     import('./feature-modules/example/example.module').then(
      //       (m) => m.ExampleModule
      //     ),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
