import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spitze',
  standalone: true,
})
export class SpitzePipe implements PipeTransform {
  transform<T = unknown>(value: T): T | string {
    if (typeof value !== 'number') {
      return value;
    }

    return `${value < 0 ? 'ohne' : 'mit'} ${Math.abs(value)}`;
  }
}
