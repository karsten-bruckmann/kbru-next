import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { NEVER } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game.model';

export class GameTypeFormControl extends FormControl<GameType | null> {
  public possibleValues: GameType[] = [];

  public static get validator(): ValidatorFn {
    return (control) => {
      if (
        !['diamonds', 'hearts', 'spades', 'grand', 'null'].includes(
          control.value
        )
      ) {
        return { invalid: true };
      }
      return null;
    };
  }

  public static formEffect(): FormEffect<SkatGameFormGroup> {
    return (form) => {
      form.controls.gameType.possibleValues = [
        'diamonds',
        'hearts',
        'spades',
        'grand',
        'null',
      ];
      return NEVER;
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
