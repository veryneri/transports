import { NgModule } from '@angular/core';
import { DocumentTypePipe } from './document-type.pipe';
import { StatusPipe } from './status.pipe';
import { VehicleTypePipe } from './vehicle-type.pipe';

@NgModule({
    declarations: [
      DocumentTypePipe,
      StatusPipe,
      VehicleTypePipe
    ],
    exports: [
      DocumentTypePipe,
      StatusPipe,
      VehicleTypePipe
    ]
})

export class PipesModule { }
