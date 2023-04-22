import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { groupsSelector } from '@kbru/spielwille/data-access/groups';
import { Store } from '@ngrx/store';
import { firstValueFrom, NEVER } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

@Injectable({ providedIn: 'root' })
export class GroupIdFormControl extends FormControl<string | null> {
  constructor(private store$: Store) {
    super(null, {
      asyncValidators: [
        async (control) => {
          if (typeof control.value !== 'string') {
            return { type: true };
          }

          const groups = await firstValueFrom(
            this.store$.select(groupsSelector)
          );

          if (!groups[control.value]) {
            return { invalidId: true };
          }

          return null;
        },
      ],
    });
  }

  public formEffect(): FormEffect<SkatListFormGroup> {
    return () => NEVER;
  }

  public getPlayerName: (id: string) => string = () => '';
}
