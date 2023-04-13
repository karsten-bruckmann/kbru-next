import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game-type.model';
import { List } from '../models/list.model';
import { getPossibleSpitzen } from '../rules/get-possible-spitzen.rule';
import { getStandardGameTypes } from '../rules/get-standard-game-types.rule';

export class SpitzenFormControl extends FormControl<number | null> {
  public possibleValues: number[] = [];

  public static getValidator(list: List): ValidatorFn {
    return (control) => {
      if (!getPossibleSpitzen(list).includes(control.value)) {
        return { invalid: true };
      }
      return null;
    };
  }

  public static formEffect(list: List): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return form.controls.gameType.valueChanges.pipe(
        startWith(form.controls.gameType.value),
        tap((gameType) => {
          const types: (GameType | null)[] = getStandardGameTypes();
          if (types.includes(gameType) && !form.controls.spitzen) {
            form.addControl(
              'spitzen',
              new SpitzenFormControl(
                null,
                SpitzenFormControl.getValidator(list)
              )
            );
          }
          if (!types.includes(gameType) && form.controls.spitzen) {
            form.removeControl('spitzen');
          }
          if (form.controls.spitzen) {
            form.controls.spitzen.possibleValues = getPossibleSpitzen(list);
          }
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
