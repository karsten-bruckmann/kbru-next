import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listSummary',
  standalone: true,
})
export class ListSummaryPipe implements PipeTransform {
  transform<T = unknown>(value: T): T | string {
    switch (value) {
      case 'seger-fabian':
        return 'Turnier-Abrechnung';
      case 'classic':
        return 'Klassisch';
      case 'bierlachs':
        return 'Bierlachs';
      case 'romanow':
        return 'Romanow';
      default:
        return value;
    }
  }
}
