import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRouting } from './projects.routing.module';
import { WorkComponent } from './work/work.component';
import { FeaturesCardsComponent } from './features-cards/features-cards.component';
import { CurrentProjectModule } from './current-project/current-project.module';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { DateFormatPipe } from '../shared/pipes/time.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ProjectsComponent, WorkComponent, FeaturesCardsComponent, DateFormatPipe],
  imports: [
    CommonModule,
    CurrentProjectModule,
    SharedComponentsModule,
    ProjectsRouting,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  exports: [FeaturesCardsComponent] 
})
export class ProjectsModule { }
