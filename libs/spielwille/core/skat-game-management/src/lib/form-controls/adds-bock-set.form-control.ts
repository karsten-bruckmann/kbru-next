import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import {
  distinctUntilContentChanged,
  toVoid,
} from '@kbru/shared/utils/rxjs-utils';
import { Store } from '@ngrx/store';
import {
  firstValueFrom,
  map,
  NEVER,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { listSelector } from '../selectors/list.selector';

@Injectable({ providedIn: 'root' })
export class AddsBockSetControl extends FormControl<boolean | null> {
  constructor(private store$: Store) {
    super(null, {
      asyncValidators: [
        async (control) => {
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

          if (typeof control.value !== 'boolean') {
            return { invalid: true };
          }

          if (list.rules.bockSets === false && control.value !== false) {
            return { invalid: true };
          }

          return null;
        },
      ],
    });
  }

  public formEffect(): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return form.controls.listId.valueChanges.pipe(
        startWith(form.controls.listId.value),
        switchMap((listId) =>
          listId ? this.store$.select(listSelector(listId)) : of(null)
        ),
        switchMap((list) => {
          const bockSetsSettings = list?.rules.bockSets ?? false;

          if (bockSetsSettings === false) {
            if (form.controls.addsBockSet) {
              form.removeControl('addsBockSet');
            }
            return NEVER;
          }

          if (!form.controls.addsBockSet) {
            form.addControl('addsBockSet', this);
          }

          return form.valueChanges.pipe(
            map((value) => [value.spritze, value.won]),
            startWith([form.value.spritze, form.value.won]),
            distinctUntilContentChanged(),
            tap(([spritze, won]) => {
              const control = form.controls.addsBockSet;

              if (!control) {
                throw new Error();
              }

              if (
                ((spritze === 're' || spritze === 'hirsch') &&
                  bockSetsSettings.kontraRe) ||
                (spritze !== null &&
                  won === false &&
                  bockSetsSettings.kontraLost)
              ) {
                control.value !== true && control.setValue(true);
                control.enabled && control.disable();
                return;
              }

              if (control.disabled) {
                control.enable();
                control.setValue(false);
              }
            }),
            toVoid()
          );
        })
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
