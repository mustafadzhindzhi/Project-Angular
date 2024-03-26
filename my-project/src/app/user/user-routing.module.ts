import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfilesComponent } from './profiles/profiles.component';

const routes: Routes = [
  { path: 'signUp', component: LoginComponent },
  { path: 'profile', component: ProfilesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
