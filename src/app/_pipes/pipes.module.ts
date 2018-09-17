import { NgModule } from '@angular/core';
import { DocumentTypePipe } from './document-type.pipe';

@NgModule({
    declarations: [
      DocumentTypePipe,
    ],
    exports     : [
      DocumentTypePipe
    ]
})

export class PipesModule { }
