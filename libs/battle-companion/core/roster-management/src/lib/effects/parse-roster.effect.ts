import { Injectable } from '@angular/core';
import { unzipSingleFileContainer } from '@kbru/shared/utils/zip';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { addRosterFormSubmitted } from '../actions/add-roster-form-submitted.action';
import { rosterParsed } from '../actions/roster-parsed.action';
import { convertRoster } from '../rules/convert-roster.rule';
import { parse } from '../rules/parse-roster.rule';

@Injectable()
export class ParseRosterEffect {
  constructor(private actions$: Actions) {}

  public effect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRosterFormSubmitted),
      switchMap((action) => unzipSingleFileContainer(action.file)),
      switchMap((file) => file.text()),
      switchMap((content) => parse(content)),
      map((bsRoster) => convertRoster(bsRoster)),
      map((roster) => rosterParsed({ roster }))
    )
  );
}
