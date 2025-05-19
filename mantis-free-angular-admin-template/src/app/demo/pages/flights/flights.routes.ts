import { Routes } from '@angular/router';
import { FlightListComponent } from './flight-list/flight-list/flight-list.component';
import { FlightFormComponent } from './flight-form/flight-form/flight-form.component';
import { authGuard } from 'src/app/guards/auth.guard';

export const FlightRoutes: Routes = [{
    path: '',
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
        },
        {
            path: 'list',
            component: FlightListComponent
        },
        {
            path: 'form',
            component: FlightFormComponent
        },
        {
            path: 'form/:id',
            component: FlightFormComponent
        }
    ], canActivate: [authGuard]
}]