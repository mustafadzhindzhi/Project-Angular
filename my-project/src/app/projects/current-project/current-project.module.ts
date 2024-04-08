import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentProjectComponent } from './current-project.component';
import { DetailsComponent } from './details/details.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { ImagesComponent } from './images/images.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CurrentProjectComponent, DetailsComponent, ChallengesComponent, ImagesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CurrentProjectModule { }
