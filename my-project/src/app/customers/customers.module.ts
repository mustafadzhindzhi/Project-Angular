import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { CustomerRouting } from './customers.routing.module';

@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedComponentsModule,
    CustomerRouting
  ]
})
export class CustomerModule { }
