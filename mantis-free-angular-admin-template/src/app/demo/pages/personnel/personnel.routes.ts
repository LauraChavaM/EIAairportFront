import {Routes} from '@angular/router';
import { PersonnelListComponent } from './personnel-list/personnel-list.component';
import { PersonnelFormComponent } from './personnel-form/personnel-form.component';
import { authGuard } from 'src/app/guards/auth.guard';

export const PersonnelRoutes: Routes = [{
    path:'',
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
        },
        {
            path:'list',
            component: PersonnelListComponent
        },
        {
            path:'form',
            component: PersonnelFormComponent
        },
        {
            path: 'form/:id',
            component: PersonnelFormComponent
        }
    ], canActivate: [authGuard]
}]