import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genericStatus'
})
export class StatusPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Activo' : 'Inactivo' ;
  }

}
