import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { combineLatest, map, startWith } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

export class BockFormControl extends FormControl<boolean | null> {
  public static get validator(): ValidatorFn {
    return requiredBooleanValidatorFunction;
  }

  public static formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      return combineLatest([
        form.controls.kontra.valueChanges.pipe(
          startWith(form.controls.kontra.value)
        ),
        form.controls.re.valueChanges.pipe(startWith(form.controls.re.value)),
      ]).pipe(
        map(([kontra, re]) => {
          if ((kontra || re) && form.controls.bock.disabled) {
            form.controls.bock.enable();
            form.controls.bock.setValue(true);
          }
          if ((!kontra || !re) && form.controls.bock.enabled) {
            form.controls.bock.disable();
            form.controls.bock.setValue(false);
          }
        })
      );
    };
  }
}
