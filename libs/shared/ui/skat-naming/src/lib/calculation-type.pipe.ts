import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculationType',
  standalone: true,
})
export class CalculationTypePipe implements PipeTransform {
  transform<T = unknown>(value: T): T | string {
    switch (value) {
      case 'seger-fabian':
        return 'Seger Fabian';
      case 'bierlachs':
        return 'Bierlachs';
      default:
        return value;
    }
  }
}
