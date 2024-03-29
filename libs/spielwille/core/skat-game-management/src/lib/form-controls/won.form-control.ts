import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import {
  distinctUntilContentChanged,
  toVoid,
} from '@kbru/shared/utils/rxjs-utils';
import { startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { isLostByThresholdAnnouncement } from '../rules/is-lost-by-threshold-announcement.rule';

export class WonFormControl extends FormControl<boolean | null> {
  constructor() {
    super(null);
  }

  public possibleValues: boolean[] = [true, false];

  public formEffect(): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return form.valueChanges.pipe(
        distinctUntilContentChanged(),
        startWith(form.value),
        tap((formValue) => {
          const wonControl = form.controls.won;
          const gameType = formValue.gameType;
          const threshold = formValue.threshold;
          const thresholdAnnounced = formValue.thresholdAnnounced;

          if (!wonControl) {
            return;
          }

          if (!gameType) {
            wonControl.possibleValues = [];
            wonControl.setValue(null);
            wonControl.disable();
            return;
          }

          if (wonControl.disabled) {
            wonControl.setValue(true);
            wonControl.enable();
          }

          if ('ramsch' === gameType) {
            wonControl.possibleValues = [false];
            wonControl.setValue(false);
            return;
          }

          if ('durchmarsch' === gameType) {
            wonControl.possibleValues = [true];
            wonControl.setValue(true);
            return;
          }

          if (
            isLostByThresholdAnnouncement(
              threshold ?? null,
              thresholdAnnounced ?? null
            )
          ) {
            wonControl.possibleValues = [false];
            wonControl.setValue(false);
            return;
          }

          wonControl.possibleValues = [true, false];
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
