import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlertViewComponent } from './alert-view.component';

@NgModule({
  declarations: [
    AlertViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AlertViewComponent
  ]
})
export class AlertViewModule { }
