import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRouting } from './projects.routing.module';
import { WorkComponent } from './work/work.component';
import { FeaturesCardsComponent } from './features-cards/features-cards.component';
import { CurrentProjectModule } from './current-project/current-project.module';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';

@NgModule({
  declarations: [ProjectsComponent, WorkComponent, FeaturesCardsComponent],
  imports: [
    CommonModule,
    ProjectsRouting,
    CurrentProjectModule,
    SharedComponentsModule
  ]
})
export class ProjectsModule { }
