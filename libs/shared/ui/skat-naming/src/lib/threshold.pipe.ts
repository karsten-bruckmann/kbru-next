import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'threshold',
  standalone: true,
})
export class ThresholdPipe implements PipeTransform {
  transform<T = unknown>(value: T): T | string {
    switch (value) {
      case 'schneider':
        return 'Schneider';
      case 'schwarz':
        return 'Schwarz';
      default:
        return value;
    }
  }
}
