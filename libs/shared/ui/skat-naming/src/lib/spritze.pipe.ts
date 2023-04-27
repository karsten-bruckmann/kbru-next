import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spritze',
  standalone: true,
})
export class SpritzePipe implements PipeTransform {
  transform<T = unknown>(value: T): T | string {
    switch (value) {
      case 'kontra':
        return 'Kontra';
      case 're':
        return 'Re';
      case 'hirsch':
        return 'hirsch';
      default:
        return value;
    }
  }
}
