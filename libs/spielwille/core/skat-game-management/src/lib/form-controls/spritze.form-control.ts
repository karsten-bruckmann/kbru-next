import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { NEVER, startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { getPossibleSpritzen } from '../rules/get-possible-spritzen.rule';
import { getStandardGameTypes } from '../rules/get-standard-game-types.rule';
import { GameType, Spritze } from '../schemas/game.schema';
import { List } from '../schemas/list.schema';

export class SpritzeFormControl extends FormControl<Spritze> {
  public possibleValues: Spritze[] = [];

  public static getValidator(list: List): ValidatorFn {
    return (control) => {
      if (!getPossibleSpritzen(list).includes(control.value)) {
        return { invalid: true };
      }
      return null;
    };
  }

  public static formEffect(list: List): FormEffect<SkatGameFormGroup> {
    return (form) => {
      if (list.rules.maxSpritze === null) {
        if (form.controls.spritze) {
          form.removeControl('spritze');
        }
        return NEVER;
      }
      return form.controls.gameType.valueChanges.pipe(
        startWith(form.controls.gameType.value),
        tap((gameType) => {
          const types: (GameType | null)[] = getStandardGameTypes();
          if (types.includes(gameType) && !form.controls.spritze) {
            form.addControl(
              'spritze',
              new SpritzeFormControl(
                null,
                SpritzeFormControl.getValidator(list)
              )
            );
          }
          if (!types.includes(gameType) && form.controls.spritze) {
            form.removeControl('spritze');
          }
          if (form.controls.spritze) {
            form.controls.spritze.possibleValues = getPossibleSpritzen(list);
          }
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
