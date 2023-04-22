import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { Store } from '@ngrx/store';
import { firstValueFrom, of, startWith, switchMap, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { listSelector } from '../selectors/list.selector';

@Injectable({ providedIn: 'root' })
export class PlayerIndexFormControl extends FormControl<number | null> {
  constructor(private store$: Store) {
    super(null, {
      asyncValidators: [
        async (control) => {
          if (typeof control.value !== 'number') {
            return { type: true };
          }

          if (!(control.parent instanceof SkatGameFormGroup)) {
            return { parent: true };
          }

          if (!control.parent.controls.listId.value) {
            return { listId: true };
          }

          const list = await firstValueFrom(
            this.store$.select(
              listSelector(control.parent.controls.listId.value)
            )
          );

          if (!list) {
            return { list: true };
          }

          if (!list?.playerNames[control.value]) {
            return { invalidId: true };
          }

          return null;
        },
      ],
    });
  }

  public possibleValues: number[] = [];
  public names: string[] = [];

  public formEffect(): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return form.controls.listId.valueChanges.pipe(
        startWith(form.controls.listId.value),
        switchMap((listId) =>
          listId ? this.store$.select(listSelector(listId)) : of(null)
        ),
        tap((list) => {
          form.controls.playerIndex.possibleValues =
            list?.status?.activePlayers || [];
          form.controls.playerIndex.names = list?.playerNames ?? [];
        }),
        toVoid()
      );
    };
  }
}
