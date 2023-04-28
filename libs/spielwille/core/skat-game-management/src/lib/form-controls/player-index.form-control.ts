import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { combineLatest, delay, Observable, startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { List } from '../models/list.model';

export class PlayerIndexFormControl extends FormControl<number | null> {
  constructor() {
    super(null);
  }

  public possibleValues: number[] = [];

  public formEffect(
    list$: Observable<List | null>
  ): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return combineLatest([
        list$,
        this.valueChanges.pipe(startWith(this.value)),
      ]).pipe(
        delay(1),
        tap(([list]) => {
          form.controls.playerIndex.possibleValues =
            list?.status?.activePlayers.filter(
              (playerIndex) =>
                list.status.availableGameTypes[playerIndex].length > 0
            ) || [];
          if (list?.rules.addOn === 'romanow' && !form.value.playerIndex) {
            form.controls.playerIndex.setValue(
              form.controls.playerIndex.possibleValues[0]
            );
          }
        }),
        toVoid()
      );
    };
  }
}
