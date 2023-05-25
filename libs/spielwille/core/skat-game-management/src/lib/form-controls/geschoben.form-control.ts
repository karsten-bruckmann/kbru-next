import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { filterNullish, toVoid } from '@kbru/shared/utils/rxjs-utils';
import { combineLatest, Observable, startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game-type.model';
import { List } from '../models/list.model';

export class GeschobenFormControl extends FormControl<number | null> {
  constructor() {
    super(0);
  }

  public readonly min = 0;
  public readonly max = 2;

  public formEffect(
    list$: Observable<List | null>
  ): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return combineLatest([
        form.controls.gameType.valueChanges.pipe(
          startWith(form.controls.gameType.value)
        ),
        list$.pipe(filterNullish()),
      ]).pipe(
        tap(([gameType, list]) => {
          const isRamschSet =
            list.status.fixedSets[0]?.type === 'ramsch' &&
            list.status.fixedSets[0]?.remainingGames > 0;

          if (
            isRamschSet &&
            (!list.rules.bockSets ||
              !list.rules.bockSets.ramsch ||
              !list.rules.bockSets.ramsch.geschoben)
          ) {
            return;
          }

          if (
            !isRamschSet &&
            (!list.rules.ramsch || !list.rules.ramsch.geschoben)
          ) {
            return;
          }

          const types: (GameType | null)[] = ['ramsch'];
          if (types.includes(gameType) && !form.controls.geschoben) {
            form.addControl('geschoben', this);
          }
          if (!types.includes(gameType) && form.controls.geschoben) {
            form.removeControl('geschoben');
          }
        }),
        toVoid()
      );
    };
  }
}
