import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AppFirstSectionComponent } from './app-first-section/app-first-section.component';
import { ServicesComponent } from './services/services.component';
import { ScreenshotComponent } from './screenshot/screenshot.component';
import { PowersComponent } from './powers/powers.component';
import { FeaturesComponent } from './features/features.component';
import { WorkComponent } from './work/work.component';
import { BlogComponent } from './blog/blog.component';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [HomeComponent, AppFirstSectionComponent, ServicesComponent, ScreenshotComponent, PowersComponent, FeaturesComponent, WorkComponent, BlogComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
