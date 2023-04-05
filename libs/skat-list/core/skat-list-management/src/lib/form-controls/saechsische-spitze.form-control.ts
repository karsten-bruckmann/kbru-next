import { FormControl, ValidatorFn } from '@angular/forms';
import { controlValue$ } from '@kbru/shared/utils/angular-utils';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { AddOn } from '@kbru/skat-list/data-access/skat-lists';
import { EMPTY, tap } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

export class SaechsischeSpitzeFormControl extends FormControl<boolean | null> {
  public static get validator(): ValidatorFn {
    return requiredBooleanValidatorFunction;
  }

  public static formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      const control = form.controls.saechsischeSpitze;
      control.setValue(false);
      return controlValue$(form.controls.addOns).pipe(
        tap((addOns) => {
          if (addOns?.includes(AddOn.Romanow)) {
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
