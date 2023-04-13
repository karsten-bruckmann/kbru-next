import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { getAllNullTypes } from '../rules/get-all-null-types.rule';
import { GameType, NullType } from '../schemas/game.schema';

export class NullTypeFormControl extends FormControl<NullType | null> {
  public possibleValues: NullType[] = [];

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
          if (types.includes(gameType) && !form.controls.nullType) {
            form.addControl(
              'nullType',
              new NullTypeFormControl(null, NullTypeFormControl.validator)
            );
          }
          if (!types.includes(gameType) && form.controls.nullType) {
            form.removeControl('nullType');
          }
          if (form.controls.nullType) {
            form.controls.nullType.possibleValues = getAllNullTypes();
          }
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
