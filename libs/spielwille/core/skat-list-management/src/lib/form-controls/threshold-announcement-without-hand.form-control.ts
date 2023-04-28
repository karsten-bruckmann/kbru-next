import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { startWith, tap } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

@Injectable({ providedIn: 'root' })
export class ThresholdAnnouncementWithoutHandControl extends FormControl<
  boolean | null
> {
  constructor() {
    super(false, requiredBooleanValidatorFunction);
  }

  public formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      return form.controls.addOn.valueChanges.pipe(
        startWith(form.controls.addOn.value),
        tap((addOn) => {
          if (addOn === 'romanow') {
            this.setValue(true);
            this.disable();
          }
        }),
        toVoid()
      );
    };
  }
}
