import { SignupComponent } from './signup/signup.component';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NextStepComponent} from './next-step/next-step.component';
import { SignupSuccessComponent} from './signup-success/signup-success.component';

export const routes: Routes = [

    { path: '', component: WelcomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login-success', component: LoginSuccessComponent},
    {path:'signup', component: SignupComponent},
    {path:'next-step', component: NextStepComponent},
    {path:'signup-success', component: SignupSuccessComponent},
    { path: '**', redirectTo: 'AppComponent' },

];
