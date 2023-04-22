import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

@Injectable({ providedIn: 'root' })
export class RamschSetsJungfrauFormControl extends FormControl<boolean | null> {
  constructor() {
    super(null, requiredBooleanValidatorFunction);
  }

  public formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      return form.controls.ramschSets.valueChanges.pipe(
        startWith(form.controls.ramschSets.value),
        map((ramschSets) => {
          if (ramschSets && form.controls.ramschSetsJungfrau.disabled) {
            form.controls.ramschSetsJungfrau.enable();
            form.controls.ramschSetsJungfrau.setValue(true);
          }
          if (!ramschSets && form.controls.ramschSetsJungfrau.enabled) {
            form.controls.ramschSetsJungfrau.disable();
            form.controls.ramschSetsJungfrau.setValue(false);
          }
        })
      );
    };
  }
}
