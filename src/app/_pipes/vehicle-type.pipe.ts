import { Pipe, PipeTransform } from '@angular/core';
import { VEHICLE_TYPES } from '../_constants';

@Pipe({
  name: 'vehicleType'
})
export class VehicleTypePipe implements PipeTransform {

  transform(value: number): string {
    return VEHICLE_TYPES[value];
  }

}
