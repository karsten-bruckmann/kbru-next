import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { combineLatest, map, startWith } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

@Injectable({ providedIn: 'root' })
export class HirschFormControl extends FormControl<boolean | null> {
  constructor() {
    super(null, requiredBooleanValidatorFunction);
  }

  public formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      return combineLatest([
        form.controls.kontra.valueChanges.pipe(
          startWith(form.controls.kontra.value)
        ),
        form.controls.re.valueChanges.pipe(startWith(form.controls.re.value)),
      ]).pipe(
        map(([kontra, re]) => {
          if ((kontra || re) && form.controls.hirsch.disabled) {
            form.controls.hirsch.enable();
            form.controls.hirsch.setValue(true);
          }
          if ((!kontra || !re) && form.controls.hirsch.enabled) {
            form.controls.hirsch.disable();
            form.controls.hirsch.setValue(false);
          }
        })
      );
    };
  }
}
