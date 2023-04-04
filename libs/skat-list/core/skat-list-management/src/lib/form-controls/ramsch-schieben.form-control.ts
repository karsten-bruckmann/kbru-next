import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

export class RamschSchiebenFormControl extends FormControl<boolean | null> {
  public static get validator(): ValidatorFn {
    return requiredBooleanValidatorFunction;
  }

  public static formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      return form.controls.ramsch.valueChanges.pipe(
        startWith(form.controls.ramsch.value),
        map((ramsch) => {
          if (ramsch && form.controls.ramschSchieben.disabled) {
            form.controls.ramschSchieben.enable();
            form.controls.ramschSchieben.setValue(true);
          }
          if (!ramsch && form.controls.ramschSchieben.enabled) {
            form.controls.ramschSchieben.disable();
            form.controls.ramschSchieben.setValue(false);
          }
        })
      );
    };
  }
}
