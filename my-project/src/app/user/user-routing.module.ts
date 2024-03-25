import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'signUp', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'customers', component: ProfilesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
