import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'centPerPoint',
  standalone: true,
})
export class CentPerPointPipe implements PipeTransform {
  transform<T = unknown>(value: T): T | string {
    switch (value) {
      case 0:
        return 'Keine Auszahlung';
      case 1:
        return '1 Cent';
      case 0.5:
        return '1/2 Cent';
      case 0.25:
        return '1/4 Cent';
      case 0.1:
        return '1/10 Cent';
      default:
        return value;
    }
  }
}
