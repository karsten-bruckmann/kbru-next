import { Injectable } from '@angular/core';
import { unzipSingleFileContainer } from '@kbru/shared/utils/zip';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, switchMap, tap } from 'rxjs';

import { addRosterFormSubmitted } from '../actions/add-roster-form/add-roster-form-submitted.action';
import { rosterParsed } from '../actions/roster-parsed-unzipped.action';
import { convertRoster } from '../rules/convert-roster.rule';
import { parse } from '../rules/parse-roster.rule';

@Injectable()
export class ParseRosterEffect {
  constructor(private actions$: Actions) {}

  public effect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRosterFormSubmitted),
      switchMap((action) => from(unzipSingleFileContainer(action.file))),
      switchMap((file) => from(file.text())),
      tap(console.log),
      switchMap((content) => parse(content)),
      tap(console.log),
      map((bsRoster) => convertRoster(bsRoster)),
      map((roster) => rosterParsed({ roster }))
    )
  );
}
