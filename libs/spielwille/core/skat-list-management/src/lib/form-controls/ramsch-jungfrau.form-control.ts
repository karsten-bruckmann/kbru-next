import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

@Injectable({ providedIn: 'root' })
export class RamschJungfrauFormControl extends FormControl<boolean | null> {
  constructor() {
    super(null, requiredBooleanValidatorFunction);
  }

  public formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      return form.controls.ramsch.valueChanges.pipe(
        startWith(form.controls.ramsch.value),
        map((ramsch) => {
          if (ramsch && form.controls.ramschJungfrau.disabled) {
            form.controls.ramschJungfrau.enable();
            form.controls.ramschJungfrau.setValue(true);
          }
          if (!ramsch && form.controls.ramschJungfrau.enabled) {
            form.controls.ramschJungfrau.disable();
            form.controls.ramschJungfrau.setValue(false);
          }
        })
      );
    };
  }
}
