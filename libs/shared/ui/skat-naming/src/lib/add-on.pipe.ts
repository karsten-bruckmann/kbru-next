import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addOn',
  standalone: true,
})
export class AddOnPipe implements PipeTransform {
  transform<T = unknown>(value: T): T | string {
    switch (value) {
      case 'Romanow':
        return 'Romanow';
      case 'None':
        return '-';
      default:
        return value;
    }
  }
}
