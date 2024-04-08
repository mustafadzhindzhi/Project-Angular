import { NgModule } from '@angular/core';
import { DateFormatPipe } from './pipes/time.pipe';

@NgModule({
  declarations: [
    DateFormatPipe
  ],
  exports: [
    DateFormatPipe
  ]
})
export class SharedModule {}
