import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { IntroductionComponent } from 'src/app/pages/introduction/introduction.component';

export const AuthLayoutRoutes: Routes = [
    { path: '', redirectTo: '#/landing', pathMatch: 'full' },
    //{ path: '', redirectTo: '#/login', pathMatch: 'full' },
    { path: 'landing',          component: IntroductionComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent }
];
