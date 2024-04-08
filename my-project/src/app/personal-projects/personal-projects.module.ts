import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalProjectsComponent } from './personal-projects.component';
import { PersonalProjectsRouting } from './personal-projects.routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [PersonalProjectsComponent],
  imports: [
    CommonModule,
    PersonalProjectsRouting,
    SharedModule,
    RouterModule
  ]
})
export class PersonalProjectsModule { }
