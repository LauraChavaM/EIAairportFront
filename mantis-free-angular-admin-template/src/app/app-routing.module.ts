import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      
      {
        path: 'dashboard/default',
        loadComponent: () =>
          import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent),
      },
      {
        path:'users',
        loadChildren: ()=>
          import('./demo/pages/user/user.routes').then((c) => c.UserRoutes)
      },
      // { 
      //   path: 'flights',
      //   loadComponent: () =>
      //     import('./demo/pages/flights/flights.routes').then((c) => c.FlightRoutes)
      // },
      // {
      //   path: 'personnel',
      //   loadComponent: () =>
      //     import('./demo/pages/personnel/personnel.routes').then((c) => c.PersonnelRoutes)
      // }
      {
        path: 'services',
        loadChildren: () =>
          import('./demo/pages/services/services.routes').then((c) => c.ServicesRoutes)
      }
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