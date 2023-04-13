import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { NEVER } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { getAllGameTypes } from '../rules/get-all-game-types.rule';
import { GameType } from '../schemas/game.schema';

export class GameTypeFormControl extends FormControl<GameType | null> {
  public possibleValues: GameType[] = [];

  public static get validator(): ValidatorFn {
    return (control) => {
      if (!getAllGameTypes().includes(control.value)) {
        return { invalid: true };
      }
      return null;
    };
  }

  public static formEffect(): FormEffect<SkatGameFormGroup> {
    return (form) => {
      form.controls.gameType.possibleValues = getAllGameTypes();
      return NEVER;
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
