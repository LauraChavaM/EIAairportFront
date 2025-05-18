import {Routes} from '@angular/router';
import { PassengersListComponent } from './passengers-list/passengers-list.component';
import { PassengersFormComponent } from './passengers-form/passengers-form.component';
import { authGuard } from 'src/app/guards/auth.guard';

export const PassengersRoutes: Routes = [{
    path:'',
    children: [
        {
            path:'list',
            component: PassengersListComponent
        },
        {
            path:'form',
            component: PassengersFormComponent
        }
    ], canActivate: [authGuard]
}]