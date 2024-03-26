import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsRouting } from './contacts.routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ContactsRouting,
    RouterModule
  ]
})
export class ContactsModule { }
