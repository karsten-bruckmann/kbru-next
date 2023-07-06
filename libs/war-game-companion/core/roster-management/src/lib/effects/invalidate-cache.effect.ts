import { Injectable } from '@angular/core';
import { gameDefinitionDataSelector } from '@kbru/war-game-companion/data-access/game-definition-data';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

import { findEntry } from '../rules/find-entry.rule';

@Injectable()
export class InvalidateCacheEffect {
  constructor(private readonly store$: Store) {}

  public effect$ = createEffect(
    () =>
      this.store$.select(gameDefinitionDataSelector).pipe(
        tap(() => {
          if (findEntry.cache.clear) {
            findEntry.cache.clear();
          }
        })
      ),
    { dispatch: false }
  );
}
