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
import { appInterceptorProvider } from './app.interceptor';
import { FormsModule } from '@angular/forms';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomerModule } from './customers/customers.module';
import { PersonalProjectsModule } from './personal-projects/personal-projects.module';
@NgModule({
  declarations: [
    AppComponent,
    AuthenticateComponent,
    NotFoundComponent,
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
    FormsModule,
    CustomerModule,
    PersonalProjectsModule
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
