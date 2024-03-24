import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRouting } from './about-us.routing.module';
import { FormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us.component';
import { FirstSectionComponent } from './first-section/first-section.component';
import { TeamComponent } from './team/team.component';
import { ValuesComponent } from './values/values.component';
import { VisionComponent } from './vision/vision.component';
import { NewValuesComponent } from './new-values/new-values.component';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';

@NgModule({
  declarations: [AboutUsComponent, FirstSectionComponent, TeamComponent, ValuesComponent, VisionComponent,NewValuesComponent],
  imports: [
    CommonModule,
    AboutUsRouting,
    FormsModule,
    SharedComponentsModule 
  ]
})
export class AboutUsModule { }
