import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

@Injectable({ providedIn: 'root' })
export class RamschSetsFormControl extends FormControl<boolean | null> {
  constructor() {
    super(null, requiredBooleanValidatorFunction);
  }

  public formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      return form.controls.bockSets.valueChanges.pipe(
        startWith(form.controls.bockSets.value),
        map((bockSets) => {
          if (bockSets && form.controls.ramschSets.disabled) {
            form.controls.ramschSets.enable();
            form.controls.ramschSets.setValue(true);
          }
          if (!bockSets && form.controls.ramschSets.enabled) {
            form.controls.ramschSets.disable();
            form.controls.ramschSets.setValue(false);
          }
        })
      );
    };
  }
}
