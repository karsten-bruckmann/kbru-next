import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

export class AutoBockKontraReFormControl extends FormControl<boolean | null> {
  public static get validator(): ValidatorFn {
    return requiredBooleanValidatorFunction;
  }

  public static formEffect(): FormEffect<SkatListFormGroup> {
    return (form) =>
      form.controls.bockSets.valueChanges.pipe(
        startWith(form.controls.bockSets.value),
        map((bockSets) => {
          if (bockSets && form.controls.autoBockKontraRe.disabled) {
            form.controls.autoBockKontraRe.enable();
            form.controls.autoBockKontraRe.setValue(true);
          }
          if (!bockSets && form.controls.autoBockKontraRe.enabled) {
            form.controls.autoBockKontraRe.disable();
            form.controls.autoBockKontraRe.setValue(false);
          }
        })
      );
  }
}
