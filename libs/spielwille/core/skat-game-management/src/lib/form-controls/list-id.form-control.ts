import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { firstValueFrom, NEVER } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { listIdsSelector } from '../selectors/list-ids.selector';

@Injectable({ providedIn: 'root' })
export class ListIdFormControl extends FormControl<string | null> {
  constructor(private store$: Store) {
    super(null, {
      asyncValidators: [
        async (control) => {
          if (typeof control.value !== 'string') {
            return { type: true };
          }

          const listIds = await firstValueFrom(store$.select(listIdsSelector));

          if (!listIds.includes(control.value)) {
            return { invalidId: true };
          }

          return null;
        },
      ],
    });
  }

  public formEffect(): FormEffect<SkatGameFormGroup> {
    return () => NEVER;
  }

  public getPlayerName: (id: string) => string = () => '';
}
