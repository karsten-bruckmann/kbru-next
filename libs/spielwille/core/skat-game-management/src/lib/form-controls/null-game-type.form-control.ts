import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType, NullGameType } from '../schemas/game.schema';

export class NullGameTypeFormControl extends FormControl<NullGameType | null> {
  public possibleValues: NullGameType[] = [];

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
          if (types.includes(gameType) && !form.controls.nullGameType) {
            form.addControl(
              'nullGameType',
              new NullGameTypeFormControl(
                null,
                NullGameTypeFormControl.validator
              )
            );
          }
          if (!types.includes(gameType) && form.controls.nullGameType) {
            form.removeControl('nullGameType');
          }
          if (form.controls.nullGameType) {
            form.controls.nullGameType.possibleValues = [
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
