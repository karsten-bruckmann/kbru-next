import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game-type.model';
import { List } from '../models/list.model';
import { getStandardGameTypes } from '../rules/get-standard-game-types.rule';

export class HandFormControl extends FormControl<boolean | null> {
  public static get validator(): ValidatorFn {
    return (control) => {
      if (typeof control.value !== 'boolean') {
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
          if (types.includes(gameType) && !form.controls.hand) {
            form.addControl(
              'hand',
              new HandFormControl(false, HandFormControl.validator)
            );
          }
          if (!types.includes(gameType) && form.controls.hand) {
            form.removeControl('hand');
          }

          if (
            list.status?.fixedSets[0] &&
            list.status?.fixedSets[0].type === 'ramsch' &&
            list.status?.fixedSets[0].remainingGames > 0
          ) {
            form.controls.hand?.setValue(true);
            form.controls.hand?.disable();
          }
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
