import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './core/error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectsRouting } from './projects/projects.routing.module';
import { CustomerRouting } from './customers/customers.routing.module';
import { AboutUsRoutingModule } from './about-us/about-us.routing.module';
import { WhatWeDoRouting } from './what-we-do/what-we-do.routing.module';
import { ContactsRouting } from './contacts/contacts.routing.module';
import { PersonalProjectsRouting } from './personal-projects/personal-projects.routing.module';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'/home'},
  {path:'home', component: HomeComponent},
  {path:'auth', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path:'error', component: ErrorComponent},
  { path: '**', redirectTo: '/404' },
  { path: '404', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProjectsRouting, CustomerRouting, AboutUsRoutingModule, WhatWeDoRouting, ContactsRouting, PersonalProjectsRouting],
  exports: [RouterModule]
})
export class AppRoutingModule { }
