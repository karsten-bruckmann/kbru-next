import { Injectable } from '@angular/core';
import { toBase64 } from '@kbru/shared/utils/file-utils';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, switchMap } from 'rxjs';

import { avatarImageAdded } from '../actions/avatar-image-added.action';
import { avatarImageConverted } from '../actions/avatar-image-converted.action';

@Injectable()
export class ConvertAvatarImageEffect {
  constructor(private actions$: Actions) {}

  public effect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(avatarImageAdded),
      switchMap((action) =>
        from(toBase64(action.image)).pipe(
          map((base64) => avatarImageConverted({ base64, name: action.name }))
        )
      )
    )
  );
}
