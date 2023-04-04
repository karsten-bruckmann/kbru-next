import { AsyncValidatorFn, FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { groupsSelector } from '@kbru/skat-list/data-access/groups';
import { Store } from '@ngrx/store';
import { firstValueFrom, NEVER } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

export class GroupIdFormControl extends FormControl<string | null> {
  public static getAsyncValidator(store$: Store): AsyncValidatorFn {
    return async (control) => {
      if (typeof control.value !== 'string') {
        return { type: true };
      }

      const groups = await firstValueFrom(store$.select(groupsSelector));

      if (!groups[control.value]) {
        return { invalidId: true };
      }

      return null;
    };
  }

  public static formEffect(): FormEffect<SkatListFormGroup> {
    return () => NEVER;
  }

  public getPlayerName: (id: string) => string = () => '';
}
