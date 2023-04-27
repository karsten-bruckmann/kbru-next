import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { combineLatest, Observable, startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game-type.model';
import { List } from '../models/list.model';
import { getPossibleGameTypes } from '../rules/get-possible-game-types.rule';

export class GameTypeFormControl extends FormControl<GameType | null> {
  constructor() {
    super(null);
  }

  public possibleValues: GameType[] = [];

  public getPlayerName: (index: number) => string = () => '';

  public formEffect(
    list$: Observable<List | null>
  ): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return combineLatest([
        list$,
        form.controls.playerIndex.valueChanges.pipe(
          startWith(form.controls.playerIndex.value)
        ),
      ]).pipe(
        tap(([list, playerIndex]) => {
          const gameTypeControl = form.controls.gameType;

          if (typeof playerIndex !== 'number' || !list) {
            gameTypeControl.possibleValues = [];
            gameTypeControl.setValue(null);
            gameTypeControl.disable();
            return;
          }

          if (gameTypeControl.disabled) {
            gameTypeControl.enable();
          }

          gameTypeControl.possibleValues = list
            ? getPossibleGameTypes(list)[playerIndex]
            : [];
        }),
        toVoid()
      );
    };
  }
}
