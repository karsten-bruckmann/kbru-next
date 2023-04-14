import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { NEVER } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game-type.model';
import { List } from '../models/list.model';
import { getPossibleGameTypes } from '../rules/get-possible-game-types.rule';

export class GameTypeFormControl extends FormControl<GameType | null> {
  public possibleValues: GameType[] = [];

  public static getValidator(list: List): ValidatorFn {
    return (control) => {
      if (!getPossibleGameTypes(list).includes(control.value)) {
        return { invalid: true };
      }
      return null;
    };
  }

  public static formEffect(list: List): FormEffect<SkatGameFormGroup> {
    return (form) => {
      form.controls.gameType.possibleValues = getPossibleGameTypes(list);
      return NEVER;
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
