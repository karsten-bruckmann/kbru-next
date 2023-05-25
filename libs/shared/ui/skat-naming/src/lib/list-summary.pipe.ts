import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listSummary',
  standalone: true,
})
export class ListSummaryPipe implements PipeTransform {
  transform<T = unknown>(value: T): T | string {
    switch (value) {
      case 'seger-fabian':
        return 'Seger Fabian';
      case 'bierlachs':
        return 'Bierlachs';
      case 'romanow':
        return 'Romanow';
      default:
        return value;
    }
  }
}
