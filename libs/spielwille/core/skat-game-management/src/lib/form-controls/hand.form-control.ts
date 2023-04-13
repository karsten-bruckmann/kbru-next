import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../schemas/game.schema';

export class HandFormControl extends FormControl<boolean | null> {
  public static get validator(): ValidatorFn {
    return (control) => {
      if (typeof control.value !== 'boolean') {
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
          if (types.includes(gameType) && !form.controls.hand) {
            form.addControl(
              'hand',
              new HandFormControl(false, HandFormControl.validator)
            );
          }
          if (!types.includes(gameType) && form.controls.hand) {
            form.removeControl('hand');
          }
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
