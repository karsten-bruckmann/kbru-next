import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import {
  distinctUntilContentChanged,
  toVoid,
} from '@kbru/shared/utils/rxjs-utils';
import { map, NEVER, Observable, startWith, switchMap, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { List } from '../models/list.model';

export class AddsBockSetControl extends FormControl<boolean | null> {
  constructor() {
    super(null);
  }

  public formEffect(
    list$: Observable<List | null>
  ): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return list$.pipe(
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
