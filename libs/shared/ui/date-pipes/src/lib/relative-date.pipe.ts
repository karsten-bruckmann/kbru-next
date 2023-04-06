import { Pipe, PipeTransform } from '@angular/core';
import {
  differenceInDays,
  isSameDay,
  isToday,
  isTomorrow,
  isYesterday,
} from 'date-fns';

@Pipe({
  name: 'relativeDate',
  standalone: true,
})
export class RelativeDatePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (!(value instanceof Date)) {
      return value;
    }

    const now = new Date();

    if (isToday(value)) {
      return 'heute';
    }

    if (isYesterday(value)) {
      return 'gestern';
    }

    if (isTomorrow(value)) {
      return 'morgen';
    }

    const difference = differenceInDays(value, now);

    if (difference > 0) {
      return `in ${difference} Tagen`;
    }

    return `vor ${difference * -1} Tagen`;
  }
}
