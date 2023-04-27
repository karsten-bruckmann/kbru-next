import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { combineLatest, Observable, startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game-type.model';
import { List } from '../models/list.model';
import { getStandardGameTypes } from '../rules/get-standard-game-types.rule';
import { getPossibleSpitzen } from '../rules/possible-control-values/get-possible-spitzen.rule';

export class SpitzenFormControl extends FormControl<number | null> {
  constructor() {
    super(null);
  }

  public possibleValues: number[] = [];

  public formEffect(
    list$: Observable<List | null>
  ): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return combineLatest([
        form.controls.gameType.valueChanges.pipe(
          startWith(form.controls.gameType.value)
        ),
        list$,
      ]).pipe(
        tap(([gameType, list]) => {
          const types: (GameType | null)[] = getStandardGameTypes();
          if (types.includes(gameType) && !form.controls.spitzen) {
            form.addControl('spitzen', this);
          }
          if (!types.includes(gameType) && form.controls.spitzen) {
            form.removeControl('spitzen');
          }
          if (form.controls.spitzen) {
            form.controls.spitzen.possibleValues = list
              ? getPossibleSpitzen(list)
              : [];
          }
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
