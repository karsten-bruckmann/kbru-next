import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spitzen',
  standalone: true,
})
export class SpitzenPipe implements PipeTransform {
  transform<T = unknown>(value: T): T | string {
    switch (value) {
      case 4:
        return 'bis mit/ohne 4';
      case 11:
        return 'bis mit/ohne 11';
      default:
        return value;
    }
  }
}
