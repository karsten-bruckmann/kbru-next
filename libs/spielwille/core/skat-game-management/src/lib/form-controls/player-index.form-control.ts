import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { Observable, tap } from 'rxjs';

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
      return list$.pipe(
        tap((list) => {
          form.controls.playerIndex.possibleValues =
            list?.status?.activePlayers || [];
        }),
        toVoid()
      );
    };
  }
}
