import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadyComponent } from './ready/ready.component';
import { SomeComponent } from './some/some.component';

@NgModule({
  declarations: [
    ReadyComponent,
    SomeComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ReadyComponent, SomeComponent]
})
export class SharedComponentsModule { }
