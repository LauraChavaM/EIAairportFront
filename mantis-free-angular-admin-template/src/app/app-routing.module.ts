import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';
import { ServicesComponent } from './pages/services/service.component';
import { PersonnelComponent } from './pages/personnel/personnel.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: '/dashboard/default', pathMatch: 'full' },
      { path: 'dashboard/default', loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent) },
      { path: 'services', component: ServicesComponent },
      { path: 'personnel', component: PersonnelComponent }
    ]
  },
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./demo/pages/authentication/auth-login/auth-login.component').then((c) => c.AuthLoginComponent) },
      { path: 'register', loadComponent: () => import('./demo/pages/authentication/auth-register/auth-register.component').then((c) => c.AuthRegisterComponent) }
    ]
  },
  { path: '**', redirectTo: 'dashboard/default' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
