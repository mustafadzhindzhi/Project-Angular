import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRouting } from './customers.routing.module';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module'; 
import { FormsModule } from '@angular/forms';
import { CustomersComponent } from './customers.component';

@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    CustomersRouting,
    FormsModule,
    SharedComponentsModule 
  ]
})
export class CustomersModule { }
