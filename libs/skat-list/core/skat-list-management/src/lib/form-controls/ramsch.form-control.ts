import { FormControl, ValidatorFn } from '@angular/forms';
import { controlValue$ } from '@kbru/shared/utils/angular-utils';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { AddOn } from '@kbru/skat-list/data-access/skat-lists';
import { tap } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

export class RamschFormControl extends FormControl<boolean | null> {
  public static get validator(): ValidatorFn {
    return requiredBooleanValidatorFunction;
  }

  public static formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      const control = form.controls.ramsch;
      control.setValue(false);
      return controlValue$(form.controls.addOn).pipe(
        tap((addOn) => {
          if (addOn === AddOn.Romanow) {
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
