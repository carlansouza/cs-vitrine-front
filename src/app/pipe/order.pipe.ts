import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(array: any, field: string): any[] {
    if (!Array.isArray(array)) {
      return [];
    }
    array.sort((a: any, b: any) => {
      const valueA = typeof a[field] === 'number' ? a[field] : parseInt (a[field]);
      const valueB = typeof b[field] === 'number' ? b[field] : parseInt (b[field]);
      if (valueA < valueB) {
        return -1;
      } else if (valueA > valueB) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}



