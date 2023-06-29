import { Injectable } from '@angular/core';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs';

import { gameDefinitionDataLoaded } from '../actions/game-definition-data-loaded.action';
import { repositoryOpenedAction } from '../actions/repository-opened.action';
import { StorageApiClient } from '../api-clients/storage.api-client';
import { repositoryNameSelector } from '../selectors/repository-name.selector';

@Injectable()
export class LoadFromStorageEffect {
  constructor(
    private actions$: Actions,
    private readonly store$: Store,
    private apiClient: StorageApiClient
  ) {}

  public effect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(repositoryOpenedAction),
      concatLatestFrom(() => this.store$.select(repositoryNameSelector)),
      filter(
        ([action, repositoryName]) => action.repositoryName !== repositoryName
      ),
      switchMap(([action]) => this.apiClient.get(action.repositoryName)),
      filterNullish(),
      map((response) =>
        gameDefinitionDataLoaded({ gameDefinitionData: response })
      )
    )
  );
}
