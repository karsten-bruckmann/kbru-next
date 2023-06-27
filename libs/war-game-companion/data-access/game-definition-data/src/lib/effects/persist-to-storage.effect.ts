import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

import { gameDefinitionDataLoaded } from '../actions/game-definition-data-loaded.action';
import { StorageApiClient } from '../api-clients/storage.api-client';
import { gameDefinitionDataFeatureSelector } from '../selectors/game-definition-data-feature.selector';

@Injectable()
export class PersistToStorageEffect {
  constructor(
    private actions$: Actions,
    private apiClient: StorageApiClient,
    private store$: Store
  ) {}

  public effect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(gameDefinitionDataLoaded),
        switchMap(() => this.store$.select(gameDefinitionDataFeatureSelector)),
        map((data) => this.apiClient.set(data))
      ),
    { dispatch: false }
  );
}
