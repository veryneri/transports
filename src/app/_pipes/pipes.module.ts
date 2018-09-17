import { NgModule } from '@angular/core';
import { DocumentTypePipe } from './document-type.pipe';
import { VehicleTypePipe } from './vehicle-type.pipe';

@NgModule({
    declarations: [
      DocumentTypePipe,
      VehicleTypePipe
    ],
    exports: [
      DocumentTypePipe,
      VehicleTypePipe
    ]
})

export class PipesModule { }
