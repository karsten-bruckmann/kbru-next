import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { gameDefinitionDataLoaded } from '../actions/game-definition-data-loaded.action';
import { StorageApiClient } from '../api-clients/storage.api-client';

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
        map((action) => this.apiClient.set(action.gameDefinitionData))
      ),
    { dispatch: false }
  );
}
