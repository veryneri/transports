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
import {
  EmployeeService,
  VehicleService
} from './services';
import { HomeComponent } from './home/home.component';
import { PipesModule } from './_pipes/pipes.module';
import { VehiclesComponent } from './vehicles/vehicles.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    HomeComponent,
    VehiclesComponent
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
    EmployeeService,
    VehicleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
