import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalProjectsComponent } from './personal-projects.component';
import { PersonalProjectsRouting } from './personal-projects.routing.module';

@NgModule({
  declarations: [PersonalProjectsComponent],
  imports: [
    CommonModule,
    PersonalProjectsRouting
  ]
})
export class PersonalProjectsModule { }
