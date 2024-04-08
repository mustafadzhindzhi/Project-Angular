import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { AuthActivate } from '../guards/auth.activate';

const routes: Routes = [
  { path: 'signUp', component: LoginComponent },
  { path: 'profile', component: ProfilesComponent, canActivate: [AuthActivate] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
