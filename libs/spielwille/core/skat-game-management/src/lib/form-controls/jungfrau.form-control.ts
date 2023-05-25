import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { filterNullish, toVoid } from '@kbru/shared/utils/rxjs-utils';
import { combineLatest, Observable, startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game-type.model';
import { List } from '../models/list.model';

export class JungfrauFormControl extends FormControl<boolean | null> {
  constructor() {
    super(false);
  }

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
              !list.rules.bockSets.ramsch.jungfrau)
          ) {
            return;
          }

          if (
            !isRamschSet &&
            (!list.rules.ramsch || !list.rules.ramsch.jungfrau)
          ) {
            return;
          }

          const types: (GameType | null)[] = ['ramsch'];
          if (types.includes(gameType) && !form.controls.jungfrau) {
            form.addControl('jungfrau', this);
          }
          if (!types.includes(gameType) && form.controls.jungfrau) {
            form.removeControl('jungfrau');
          }
        }),
        toVoid()
      );
    };
  }
}
