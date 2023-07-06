import { Pipe, PipeTransform } from '@angular/core';
import { CategoryEntry } from '@kbru/war-game-companion/data-access/game-definition-data';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';

import { findEntry } from '../rules/find-entry.rule';
import { definitionDataSelector } from '../selectors/definition-data.selector';

@Pipe({
  name: 'categoryName',
  standalone: true,
})
export class CategoryNamePipe implements PipeTransform {
  constructor(private store$: Store) {}

  transform(value: unknown): Observable<string> {
    if (typeof value !== 'string') {
      return of('__unknown__');
    }

    return this.store$
      .select(definitionDataSelector)
      .pipe(
        map(
          (data) =>
            findEntry<CategoryEntry>(value, 'CategoryEntry', data)?.name ||
            '__unknown__'
        )
      );
  }
}
