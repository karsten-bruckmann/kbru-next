import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, from, map, switchMap } from 'rxjs';

import { gameDefinitionDataImported } from '../actions/game-definition-data-imported.action';
import { gameDefinitionDatapersisted } from '../actions/game-definition-data-persisted.action';
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
        ofType(gameDefinitionDataImported),
        switchMap((action) =>
          combineLatest([
            combineLatest(
              action.gameSystems.map((gs) =>
                from(this.apiClient.persistGameSystem(gs.gameSystem)).pipe(
                  map(() => ({
                    id: gs.gameSystem['@_id'],
                    name: gs.gameSystem['@_name'],
                  }))
                )
              )
            ),
            combineLatest(
              action.catalogues.map((cat) =>
                from(this.apiClient.persistCatalogue(cat.catalogue)).pipe(
                  map(() => ({
                    id: cat.catalogue['@_id'],
                    name: cat.catalogue['@_name'],
                    gameSystemId: cat.catalogue['@_gameSystemId'],
                  }))
                )
              )
            ),
          ]).pipe(
            map(([gameSystems, catalogues]) =>
              gameDefinitionDatapersisted({
                data: gameSystems.map((gs) => ({
                  gameSystemId: gs.id,
                  gameSystemName: gs.name,
                  catalogues: catalogues
                    .filter((cat) => cat.gameSystemId === gs.id)
                    .map((cat) => ({
                      catalogueId: cat.id,
                      catalogueName: cat.name,
                    })),
                })),
              })
            )
          )
        )
      ),
    { dispatch: false }
  );
}
