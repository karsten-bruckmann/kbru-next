import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { combineLatest, map, startWith } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

export class AutoBockKontraReFormControl extends FormControl<boolean | null> {
  public static get validator(): ValidatorFn {
    return requiredBooleanValidatorFunction;
  }

  public static formEffect(): FormEffect<SkatListFormGroup> {
    return (form) =>
      combineLatest([
        form.controls.bockSets.valueChanges.pipe(
          startWith(form.controls.bockSets.value)
        ),
        form.controls.kontra.valueChanges.pipe(
          startWith(form.controls.kontra.value)
        ),
        form.controls.re.valueChanges.pipe(startWith(form.controls.re.value)),
      ]).pipe(
        map(([bockSets, kontra, re]) => {
          if (
            bockSets &&
            kontra &&
            re &&
            form.controls.autoBockKontraRe.disabled
          ) {
            form.controls.autoBockKontraRe.enable();
            form.controls.autoBockKontraRe.setValue(true);
          }
          if (
            (!bockSets || !kontra || !re) &&
            form.controls.autoBockKontraRe.enabled
          ) {
            form.controls.autoBockKontraRe.disable();
            form.controls.autoBockKontraRe.setValue(false);
          }
        })
      );
  }
}
