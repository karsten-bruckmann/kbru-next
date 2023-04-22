import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { controlValue$ } from '@kbru/shared/utils/angular-utils';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { tap } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

@Injectable({ providedIn: 'root' })
export class RamschFormControl extends FormControl<boolean | null> {
  constructor() {
    super(null, requiredBooleanValidatorFunction);
  }

  public formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      const control = form.controls.ramsch;
      control.setValue(false);
      return controlValue$(form.controls.addOn).pipe(
        tap((addOn) => {
          if (addOn === 'romanow') {
            control.setValue(false);
            control.disable();
          } else {
            control.enable();
          }
        }),
        toVoid()
      );
    };
  }
}
