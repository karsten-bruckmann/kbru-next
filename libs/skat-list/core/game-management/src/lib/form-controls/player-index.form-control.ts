import { AsyncValidatorFn, FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import { Store } from '@ngrx/store';
import { firstValueFrom, map, startWith, switchMap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { listSelector } from '../selectors/list.selector';

export class PlayerIndexFormControl extends FormControl<number | null> {
  public possibleValues: number[] = [];

  public static getAsyncValidator(
    listId: string,
    store$: Store
  ): AsyncValidatorFn {
    return async (control) => {
      if (typeof control.value !== 'number') {
        return { type: true };
      }

      const list = await firstValueFrom(store$.select(listSelector(listId)));

      if (!list?.players[control.value]) {
        return { invalidId: true };
      }

      return null;
    };
  }

  public static formEffect(store$: Store): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return form.controls.listId.valueChanges.pipe(
        startWith(form.controls.listId.value),
        filterNullish(),
        switchMap((listId) => store$.select(listSelector(listId))),
        filterNullish(),
        map((list) => {
          form.controls.playerIndex.possibleValues = list.status.activePlayers;
          form.controls.playerIndex.getPlayerName = (index) =>
            list?.players[index].name || '';
        })
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
