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
  CheckboxModule,
  SelectModule,
  SpinnerModule
} from './_components';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AssignmentsComponent } from './assignments/assignments.component';
import { EmployeesComponent } from './employees/employees.component';
import {
  AssignmentService,
  EmployeeService,
  VehicleService
} from './services';
import { HomeComponent } from './home/home.component';
import { PipesModule } from './_pipes/pipes.module';
import { VehiclesComponent } from './vehicles/vehicles.component';

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    EmployeesComponent,
    HomeComponent,
    VehiclesComponent
  ],
  imports: [
    AlertViewModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CheckboxModule,
    FormsModule,
    HttpModule,
    PipesModule,
    ReactiveFormsModule,
    SelectModule,
    SpinnerModule
  ],
  providers: [
    AssignmentService,
    EmployeeService,
    VehicleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
