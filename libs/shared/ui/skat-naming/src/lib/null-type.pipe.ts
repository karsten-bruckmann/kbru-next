import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullType',
  standalone: true,
})
export class NullTypedPipe implements PipeTransform {
  transform<T = unknown>(value: T): T | string {
    switch (value) {
      case 'einfach':
        return 'Einfach';
      case 'hand':
        return 'Hand';
      case 'ouvert':
        return 'Ouvert';
      case 'hand-ouvert':
        return 'Hand Ouvert';
      default:
        return value;
    }
  }
}
