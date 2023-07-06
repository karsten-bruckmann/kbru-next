import { Pipe, PipeTransform } from '@angular/core';
import {
  SelectionEntry,
  SelectionEntryGroup,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { SelectionReference } from '@kbru/war-game-companion/data-access/rosters';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { findEntry } from '../rules/find-entry.rule';
import { definitionDataSelector } from '../selectors/definition-data.selector';

@Pipe({
  name: 'selectionName',
  standalone: true,
})
export class SelectionNamePipe implements PipeTransform {
  constructor(private store$: Store) {}

  transform(value: SelectionReference): Observable<string> {
    return this.store$
      .select(definitionDataSelector)
      .pipe(
        map(
          (data) =>
            (value.type === 'SelectionEntry'
              ? findEntry<SelectionEntry>(value.id, 'SelectionEntry', data)
              : findEntry<SelectionEntryGroup>(
                  value.id,
                  'SelectionEntryGroup',
                  data
                )
            )?.name || '__unknown__'
        )
      );
  }
}
