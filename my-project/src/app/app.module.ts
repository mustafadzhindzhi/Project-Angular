import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { WhatWeDoModule } from './what-we-do/what-we-do.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from './shared/shared-components/shared-components.module';
import { ProjectsModule } from './projects/projects.module';
import { AboutUsModule } from './about-us/about-us.module';
import { ContactsModule } from './contacts/contacts.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    CoreModule,
    HttpClientModule,
    WhatWeDoModule,
    SharedComponentsModule,
    ProjectsModule,
    AboutUsModule, 
    ContactsModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
