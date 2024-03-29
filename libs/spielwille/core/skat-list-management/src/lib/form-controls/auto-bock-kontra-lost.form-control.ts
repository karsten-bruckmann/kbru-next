import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { combineLatest, startWith, tap } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

@Injectable({ providedIn: 'root' })
export class AutoBockKontraLostFormControl extends FormControl<boolean | null> {
  constructor() {
    super(null, requiredBooleanValidatorFunction);
  }

  public formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      return combineLatest([
        form.controls.bockSets.valueChanges.pipe(
          startWith(form.controls.bockSets.value)
        ),
        form.controls.kontra.valueChanges.pipe(
          startWith(form.controls.kontra.value)
        ),
      ]).pipe(
        tap(([bockSets, kontra]) => {
          if (bockSets && kontra && form.controls.autoBockKontraLost.disabled) {
            form.controls.autoBockKontraLost.enable();
            form.controls.autoBockKontraLost.setValue(true);
          }
          if (
            (!bockSets || !kontra) &&
            form.controls.autoBockKontraLost.enabled
          ) {
            form.controls.autoBockKontraLost.disable();
            form.controls.autoBockKontraLost.setValue(false);
          }
        }),
        toVoid()
      );
    };
  }
}
