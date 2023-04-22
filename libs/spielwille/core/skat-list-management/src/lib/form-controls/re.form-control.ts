import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { combineLatest, map, startWith } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

@Injectable({ providedIn: 'root' })
export class ReFormControl extends FormControl<boolean | null> {
  constructor() {
    super(null, requiredBooleanValidatorFunction);
  }

  public formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      return combineLatest([
        form.controls.kontra.valueChanges.pipe(
          startWith(form.controls.kontra.value)
        ),
      ]).pipe(
        map(([kontra]) => {
          if (kontra && form.controls.re.disabled) {
            form.controls.re.enable();
            form.controls.re.setValue(true);
          }
          if (!kontra && form.controls.re.enabled) {
            form.controls.re.disable();
            form.controls.re.setValue(false);
          }
        })
      );
    };
  }
}
