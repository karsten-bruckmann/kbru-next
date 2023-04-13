import { AsyncValidatorFn, FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { firstValueFrom, NEVER } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { List } from '../models/list.model';
import { listSelector } from '../selectors/list.selector';

export class PlayerIndexFormControl extends FormControl<number | null> {
  public possibleValues: number[] = [];
  public names: string[] = [];

  public static getAsyncValidator(
    listId: string,
    store$: Store
  ): AsyncValidatorFn {
    return async (control) => {
      if (typeof control.value !== 'number') {
        return { type: true };
      }

      const list = await firstValueFrom(store$.select(listSelector(listId)));

      if (!list?.playerNames[control.value]) {
        return { invalidId: true };
      }

      return null;
    };
  }

  public static formEffect(list: List): FormEffect<SkatGameFormGroup> {
    return (form) => {
      form.controls.playerIndex.possibleValues =
        list.status?.activePlayers || [];
      form.controls.playerIndex.names = list.playerNames;
      return NEVER;
    };
  }
}
