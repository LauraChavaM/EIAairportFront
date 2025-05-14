import {Routes} from '@angular/router';

import { AuthLoginComponent } from '../authentication/auth-login/auth-login.component';
import { AuthRegisterComponent } from '../authentication/auth-register/auth-register.component';

export const AuthRoutes: Routes = [
{
    path:'',
    children: [
        {
            path:'login',
            component: AuthLoginComponent
        },
        {
            path:'register',
            component: AuthRegisterComponent
        }
    ], 
}]