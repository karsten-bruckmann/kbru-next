import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxSets',
  standalone: true,
})
export class MaxSetsPipe implements PipeTransform {
  transform<T = unknown>(value: T): T | string {
    switch (value) {
      case null:
        return 'unbegrenzt';
      case 1:
        return '1 Runde';
      case 3:
        return '3 Runden';
      default:
        return value;
    }
  }
}
