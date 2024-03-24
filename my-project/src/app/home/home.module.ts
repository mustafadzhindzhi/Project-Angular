import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AppFirstSectionComponent } from './app-first-section/app-first-section.component';
import { ServicesComponent } from './services/services.component';
import { ScreenshotComponent } from './screenshot/screenshot.component';
import { PowersComponent } from './powers/powers.component';
import { FeaturesComponent } from './features/features.component';

@NgModule({
  declarations: [HomeComponent, AppFirstSectionComponent, ServicesComponent, ScreenshotComponent, PowersComponent, FeaturesComponent],
  imports: [
    CommonModule
  ],
  exports: [HomeComponent, AppFirstSectionComponent]
})
export class HomeModule { }
