import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { rostersLoaded } from '../actions/rosters-loaded.action';
import { RostersApiClient } from '../api-clients/rosters.api-client';
import { rostersRefreshActionRegistry } from '../rosters.refresh-action-registry';

@Injectable()
export class LoadRostersEffect {
  constructor(private actions$: Actions, private apiClient: RostersApiClient) {}

  public effect$ = createEffect(() =>
    this.actions$.pipe(
      rostersRefreshActionRegistry.ofRefreshActions,
      switchMap((action) => this.apiClient.get(action.request)),
      map((response) => rostersLoaded({ rosters: response }))
    )
  );
}
