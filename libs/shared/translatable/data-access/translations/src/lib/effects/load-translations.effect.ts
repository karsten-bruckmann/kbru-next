import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { translationsLoaded } from '../actions/translations-loaded.action';
import { TranslationsApiClient } from '../api-clients/translations.api-client';
import { translationsRefreshActionRegistry } from '../translations.refresh-action-registry';

@Injectable()
export class LoadTranslationsEffect {
  constructor(
    private actions$: Actions,
    private apiClient: TranslationsApiClient
  ) {}

  public effect$ = createEffect(() =>
    this.actions$.pipe(
      translationsRefreshActionRegistry.ofRefreshActions,
      switchMap((action) => this.apiClient.get(action.request)),
      map((response) => translationsLoaded({ translations: response }))
    )
  );
}
