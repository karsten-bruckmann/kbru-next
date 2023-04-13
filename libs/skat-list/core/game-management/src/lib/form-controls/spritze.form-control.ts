import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType, Spritze } from '../models/game.model';

export class SpritzeFormControl extends FormControl<Spritze> {
  public possibleValues: Spritze[] = [];

  public static get validator(): ValidatorFn {
    return (control) => {
      if (![null, 'kontra', 're', 'hirsch'].includes(control.value)) {
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
          if (types.includes(gameType) && !form.controls.spritze) {
            form.addControl(
              'spritze',
              new SpritzeFormControl(null, SpritzeFormControl.validator)
            );
          }
          if (!types.includes(gameType) && form.controls.spritze) {
            form.removeControl('spritze');
          }
          if (form.controls.spritze) {
            form.controls.spritze.possibleValues = [
              null,
              'kontra',
              're',
              'hirsch',
            ];
          }
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
