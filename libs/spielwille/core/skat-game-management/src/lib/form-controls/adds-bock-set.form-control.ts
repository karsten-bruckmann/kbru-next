import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { distinctUntilChanged, map, NEVER, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { List } from '../models/list.model';

export class AddsBockSetControl extends FormControl<boolean | null> {
  public static getValidator(list: List): ValidatorFn {
    return (control) => {
      if (typeof control.value !== 'boolean') {
        return { invalid: true };
      }

      if (list.rules.bockSets === false && control.value !== false) {
        return { invalid: true };
      }

      return null;
    };
  }

  public static formEffect(list: List): FormEffect<SkatGameFormGroup> {
    return (form) => {
      const bockSetsSettings = list.rules.bockSets;

      if (bockSetsSettings === false) {
        if (form.controls.addsBockSet) {
          form.removeControl('addsBockSet');
        }
        return NEVER;
      }

      return form.valueChanges.pipe(
        map((value) => value.spritze),
        distinctUntilChanged(),
        tap((spritze) => {
          if (!form.controls.addsBockSet) {
            form.addControl(
              'addsBockSet',
              new AddsBockSetControl(
                null,
                AddsBockSetControl.getValidator(list)
              )
            );
          }
          const control = form.controls.addsBockSet;
          if (!control) {
            throw new Error();
          }

          if (
            (spritze === 're' || spritze === 'hirsch') &&
            bockSetsSettings.kontraRe
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
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
