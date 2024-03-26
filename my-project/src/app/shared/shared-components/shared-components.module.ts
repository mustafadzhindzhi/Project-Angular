import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadyComponent } from './ready/ready.component';
import { SomeComponent } from './some/some.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ReadyComponent,
    SomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[ReadyComponent, SomeComponent]
})
export class SharedComponentsModule { }
