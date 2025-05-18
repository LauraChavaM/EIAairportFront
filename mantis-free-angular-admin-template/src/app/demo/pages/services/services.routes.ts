import {Routes} from '@angular/router';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServicesFormComponent } from './services-form/services-form.component';
import { authGuard } from 'src/app/guards/auth.guard';

export const ServicesRoutes: Routes = [{
    path:'',
    children: [
        {
            path:'list',
            component: ServicesListComponent
        },
        {
            path:'form',
            component: ServicesFormComponent
        }
    ], canActivate: [authGuard]
}]