import { Pipe, PipeTransform } from '@angular/core';
import { DOCUMENT_TYPES } from '../_constants/document-type.constant';

@Pipe({
  name: 'documentType'
})
export class DocumentTypePipe implements PipeTransform {

  transform(value: number): string {
    return DOCUMENT_TYPES[value];
  }

}
