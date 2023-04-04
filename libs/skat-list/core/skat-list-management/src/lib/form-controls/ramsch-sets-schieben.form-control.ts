import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

export class RamschSetsSchiebenFormControl extends FormControl<boolean | null> {
  public static get validator(): ValidatorFn {
    return requiredBooleanValidatorFunction;
  }

  public static formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      return form.controls.ramschSets.valueChanges.pipe(
        startWith(form.controls.ramschSets.value),
        map((ramschSets) => {
          if (ramschSets && form.controls.ramschSetsSchieben.disabled) {
            form.controls.ramschSetsSchieben.enable();
            form.controls.ramschSetsSchieben.setValue(true);
          }
          if (!ramschSets && form.controls.ramschSetsSchieben.enabled) {
            form.controls.ramschSetsSchieben.disable();
            form.controls.ramschSetsSchieben.setValue(false);
          }
        })
      );
    };
  }
}
