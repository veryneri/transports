import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  AlertViewModule,
  SelectModule,
  SpinnerModule
} from './_components';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { EmployeeService } from './services';
import { PipesModule } from './_pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeesComponent
  ],
  imports: [
    AlertViewModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    PipesModule,
    ReactiveFormsModule,
    SelectModule,
    SpinnerModule
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
