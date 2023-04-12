import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game.model';

export class SpitzenFormControl extends FormControl<number | null> {
  public possibleValues: number[] = [];

  public static get validator(): ValidatorFn {
    return (control) => {
      if (![-4, -3, -2, -1, 1, 2, 3, 4].includes(control.value)) {
        return { invalid: true };
      }
      return null;
    };
  }

  public static formEffect(): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return form.controls.gameType.valueChanges.pipe(
        startWith(form.controls.gameType.value),
        tap((gameType) => {
          const types: (GameType | null)[] = [
            'diamonds',
            'hearts',
            'spades',
            'clubs',
            'grand',
          ];
          if (types.includes(gameType) && !form.controls.spitzen) {
            form.addControl(
              'spitzen',
              new SpitzenFormControl(null, SpitzenFormControl.validator)
            );
          }
          if (!types.includes(gameType) && form.controls.spitzen) {
            form.removeControl('spitzen');
          }
          if (form.controls.spitzen) {
            form.controls.spitzen.possibleValues = [-4, -3, -2, -1, 1, 2, 3, 4];
          }
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
