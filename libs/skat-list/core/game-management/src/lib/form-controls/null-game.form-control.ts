import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game.model';

export class NullGameFormControl extends FormControl<
  'einfach' | 'hand' | 'ouvert' | 'hand-ouvert' | null
> {
  public possibleValues: ('einfach' | 'hand' | 'ouvert' | 'hand-ouvert')[] = [];

  public static get validator(): ValidatorFn {
    return (control) => {
      if (
        !['einfach', 'hand', 'ouvert', 'hand-ouvert'].includes(control.value)
      ) {
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
          const types: (GameType | null)[] = ['null'];
          if (types.includes(gameType) && !form.controls.spitzen) {
            form.addControl(
              'nullGame',
              new NullGameFormControl(null, NullGameFormControl.validator)
            );
          }
          if (!types.includes(gameType) && form.controls.spitzen) {
            form.removeControl('nullGame');
          }
          if (form.controls.nullGame) {
            form.controls.nullGame.possibleValues = [
              'einfach',
              'hand',
              'ouvert',
              'hand-ouvert',
            ];
          }
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
