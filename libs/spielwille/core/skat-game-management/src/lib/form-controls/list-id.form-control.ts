import { AsyncValidatorFn, FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { firstValueFrom, NEVER } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { listIdsSelector } from '../selectors/list-ids.selector';

export class ListIdFormControl extends FormControl<string | null> {
  public static getAsyncValidator(store$: Store): AsyncValidatorFn {
    return async (control) => {
      if (typeof control.value !== 'string') {
        return { type: true };
      }

      const listIds = await firstValueFrom(store$.select(listIdsSelector));

      if (!listIds.includes(control.value)) {
        return { invalidId: true };
      }

      return null;
    };
  }

  public static formEffect(): FormEffect<SkatGameFormGroup> {
    return () => NEVER;
  }

  public getPlayerName: (id: string) => string = () => '';
}
