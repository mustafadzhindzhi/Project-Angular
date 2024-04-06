import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadyComponent } from './ready/ready.component';
import { SomeComponent } from './some/some.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ReadyComponent,
    SomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports:[ReadyComponent, SomeComponent]
})
export class SharedComponentsModule { }
