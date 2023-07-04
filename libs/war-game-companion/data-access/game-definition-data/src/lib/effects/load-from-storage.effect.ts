import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, switchMap } from 'rxjs';

import { catalogueLoadedAction } from '../actions/catalogue-loaded.action';
import { catalogueOpenedAction } from '../actions/catalogue-selected.action';
import { StorageApiClient } from '../api-clients/storage.api-client';

@Injectable()
export class LoadFromStorageEffect {
  constructor(private actions$: Actions, private apiClient: StorageApiClient) {}

  public effect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogueOpenedAction),
      switchMap((action) =>
        from(this.apiClient.getCatalogue(action.catalogueId)).pipe(
          switchMap((catalogue) =>
            from(
              this.apiClient.getGameSystem(
                catalogue.catalogue['@_gameSystemId']
              )
            ).pipe(
              map((gameSystem) =>
                catalogueLoadedAction({ gameSystem, catalogue })
              )
            )
          )
        )
      )
    )
  );
}
