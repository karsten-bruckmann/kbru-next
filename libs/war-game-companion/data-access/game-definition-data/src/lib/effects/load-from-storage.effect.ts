import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

import { gameDefinitionDataLoaded } from '../actions/game-definition-data-loaded.action';
import { gameDefinitionDataSliceLoaded } from '../actions/game-definition-data-slice-loaded.action';
import { StorageApiClient } from '../api-clients/storage.api-client';

@Injectable()
export class LoadFromStorageEffect implements OnInitEffects {
  constructor(private actions$: Actions, private apiClient: StorageApiClient) {}

  public effect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameDefinitionDataSliceLoaded),
      switchMap(() => this.apiClient.get()),
      map((response) =>
        gameDefinitionDataLoaded({ gameDefinitionData: response })
      )
    )
  );

  ngrxOnInitEffects(): Action {
    return gameDefinitionDataSliceLoaded();
  }
}
