import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { distinctUntilChanged, map, startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';

export class WonFormControl extends FormControl<boolean | null> {
  public possibleValues: boolean[] = [true, false];

  public static getValidator(): ValidatorFn {
    return (control) => {
      if (typeof control.value !== 'boolean') {
        return { invalid: true };
      }

      return null;
    };
  }

  public static formEffect(): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return form.valueChanges.pipe(
        map((value) => value.gameType),
        distinctUntilChanged(),
        startWith(form.value.gameType),
        tap((gameType) => {
          const wonControl = form.controls.won;

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

          wonControl.possibleValues = [true, false];
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
