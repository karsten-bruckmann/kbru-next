import { Pipe, PipeTransform } from '@angular/core';
import { ForceEntry } from '@kbru/war-game-companion/data-access/game-definition-data';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';

import { findEntry } from '../rules/find-entry.rule';
import { definitionDataSelector } from '../selectors/definition-data.selector';

@Pipe({
  name: 'forceName',
  standalone: true,
})
export class ForceNamePipe implements PipeTransform {
  constructor(private store$: Store) {}

  transform(id: string): Observable<string> {
    if (typeof id !== 'string') {
      return of('__unknown__');
    }

    return this.store$
      .select(definitionDataSelector)
      .pipe(
        map(
          (data) =>
            findEntry<ForceEntry>(id, 'ForceEntry', data)?.name || '__unknown__'
        )
      );
  }
}
