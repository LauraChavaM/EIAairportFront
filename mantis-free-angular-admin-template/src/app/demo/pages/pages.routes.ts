import { Routes } from '@angular/router';
import { DefaultComponent } from '../dashboard/default/default.component';
import { authGuard } from 'src/app/guards/auth.guard';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { StartingPageComponent } from '../component/starting-page/starting-page/starting-page.component';
import { FlightsComponent } from '../component/flights/flights/flights.component';


export const PagesRoutes: Routes = [
    {
        path: '',
        redirectTo: 'flights', // Redirect root to flights (optional)
        pathMatch: 'full',
    },
    {
        path: 'flights',
        loadComponent: () =>
            import('../component/flights/flights/flights.component').then((c) => c.FlightsComponent),
    },
    {
        path: 'dashboard/default',
        component: DefaultComponent,
        data: {
            title: 'Dashboard',
            urls: [
                { title: 'Home', url: '/' },
                { title: 'Dashboard' },
            ],
        },
        canActivate: [authGuard], // Protect the dashboard
    },
    {
        path: 'users',
        children: [
          {
            path: '',
            component: UserListComponent, // Route for displaying all users
            data: {
              title: 'User List',
              urls: [
                { title: 'Dashboard', url: '/' },
                { title: 'User List' },
              ],
            },
            canActivate: [authGuard], // Protect the user list
          },
          {
            path: 'edit/:id',
            component: UserFormComponent, // Route for editing a user
            data: {
              title: 'Edit User',
              urls: [
                { title: 'Dashboard', url: '/' },
                { title: 'User List', url: '/users' },
                { title: 'Edit User' },
              ],
            },
            canActivate: [authGuard], // Protect the user form
          },
        ],
      },
];