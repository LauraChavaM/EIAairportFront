import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';
import { StartingPageComponent } from './demo/component/starting-page/starting-page/starting-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: StartingPageComponent, // Set StartingPageComponent as the default route
      },
      {
        path: 'dashboard/default',
        loadComponent: () =>
          import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent),
      },
      {
        path: 'flights',
        loadComponent: () =>
          import('./demo/component/flights/flights/flights.component').then((c) => c.FlightsComponent),
      },



    ],
  },
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./demo/pages/authentication/auth-login/auth-login.component').then((c) => c.AuthLoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./demo/pages/authentication/auth-register/auth-register.component').then((c) => c.AuthRegisterComponent),
      },
    ],
  },
  // Catch-all route for undefined paths
  {
    path: '**',
    redirectTo: '', // Redirect undefined paths to the starting page
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}