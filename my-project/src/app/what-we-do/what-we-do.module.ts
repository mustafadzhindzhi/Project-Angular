import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatWeDoRouting } from './what-we-do.routing.module';
import { FormsModule } from '@angular/forms';
import { WhatWeDoComponent } from './what-we-do.component';
import { FirstSectionComponent } from './first-section/first-section.component';
import { WebDesignComponent } from './web-design/web-design.component';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WhatWeDoComponent, FirstSectionComponent, WebDesignComponent ],
  imports: [
    CommonModule,
    WhatWeDoRouting,
    FormsModule,
    SharedComponentsModule,
    RouterModule
  ], 
  exports: [WhatWeDoComponent]
})
export class WhatWeDoModule { }
