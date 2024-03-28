import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './core/error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'/home'},
  {path:'home', component: HomeComponent},
  {path:'auth', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path:'whatWeDo', component: WhatWeDoComponent},
  { path: 'aboutUs', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },
  {path: 'projects"',component: ProjectsComponent},
  {path:'error', component: ErrorComponent},
  { path: '**', redirectTo: '/404' },
  { path: '404', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
