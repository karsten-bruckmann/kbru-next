import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

import { avatarImagesLoaded } from '../actions/avatar-images-loaded.action';
import { avatarImagesSliceLoaded } from '../actions/avatar-images-slice-loaded.action';
import { AvatarImagesApiClient } from '../api-clients/avatar-images.api-client';

@Injectable()
export class LoadAvatarImagesEffect implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private apiClient: AvatarImagesApiClient
  ) {}

  public effect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(avatarImagesSliceLoaded),
      switchMap(() => this.apiClient.get()),
      map((response) => avatarImagesLoaded({ avatarImages: response }))
    )
  );

  ngrxOnInitEffects(): Action {
    return avatarImagesSliceLoaded();
  }
}
