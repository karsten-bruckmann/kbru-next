import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { gameDefinitionDataLoaded } from '../actions/game-definition-data-loaded.action';
import { GameDefinitionDataApiClient } from '../api-clients/game-definition-data.api-client';
import { gameDefinitionDataRefreshActionRegistry } from '../game-definition-data.refresh-action-registry';

@Injectable()
export class DownloadGameDefinitionDataEffect {
  constructor(
    private actions$: Actions,
    private apiClient: GameDefinitionDataApiClient
  ) {}

  public effect$ = createEffect(() =>
    this.actions$.pipe(
      gameDefinitionDataRefreshActionRegistry.ofRefreshActions,
      switchMap((action) => this.apiClient.get(action.indexUrl)),
      map((response) =>
        gameDefinitionDataLoaded({ gameDefinitionData: response })
      )
    )
  );
}
