import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

export class AutoBockKontraLostFormControl extends FormControl<boolean | null> {
  public static get validator(): ValidatorFn {
    return requiredBooleanValidatorFunction;
  }

  public static formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      return form.controls.bockSets.valueChanges.pipe(
        startWith(form.controls.bockSets.value),
        map((bockSets) => {
          if (bockSets && form.controls.autoBockKontraLost.disabled) {
            form.controls.autoBockKontraLost.enable();
            form.controls.autoBockKontraLost.setValue(true);
          }
          if (!bockSets && form.controls.autoBockKontraLost.enabled) {
            form.controls.autoBockKontraLost.disable();
            form.controls.autoBockKontraLost.setValue(false);
          }
        })
      );
    };
  }
}
