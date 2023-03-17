import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

import { avatarImagesLoaded } from '../actions/avatar-images-loaded.action';
import { avatarImagesSliceLoaded } from '../actions/avatar-images-slice-loaded.action';
import { AvatarImagesApiClient } from '../api-clients/avatar-images.api-client';
import { avatarImagesFeatureSelector } from '../selectors/avatar-images-feature.selector';

@Injectable()
export class PersistAvatarImagesEffect implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private apiClient: AvatarImagesApiClient,
    private store$: Store
  ) {}

  public effect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(avatarImagesLoaded),
        switchMap(() => this.store$.select(avatarImagesFeatureSelector)),
        map((data) => this.apiClient.set(data))
      ),
    { dispatch: false }
  );

  ngrxOnInitEffects(): Action {
    return avatarImagesSliceLoaded();
  }
}
