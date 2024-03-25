import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfilesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class UserModule { }
