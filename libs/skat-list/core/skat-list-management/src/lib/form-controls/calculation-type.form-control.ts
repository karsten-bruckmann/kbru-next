import { FormControl, ValidatorFn } from '@angular/forms';
import { controlValue$ } from '@kbru/shared/utils/angular-utils';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { AddOn, SkatList } from '@kbru/skat-list/data-access/skat-lists';
import { tap } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

export class CalculationTypeFormControl extends FormControl<
  SkatList['rules']['calculationType'] | null
> {
  public possibleValues: SkatList['rules']['calculationType'][] = [];

  public static get validator(): ValidatorFn {
    return (control) => {
      if (!control.value) {
        return { required: true };
      }
      if (
        typeof control.value !== 'string' &&
        control.value !== 'seger-fabian' &&
        control.value !== 'bierlachs'
      ) {
        return { type: true };
      }

      return null;
    };
  }

  public static formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      const control = form.controls.calculationType;
      control.setValue('seger-fabian');
      return controlValue$(form.controls.addOns).pipe(
        tap((addOns) => {
          if (addOns?.includes(AddOn.Romanow)) {
            control.setValue('bierlachs');
            control.possibleValues = ['bierlachs'];
            control.disable();
          } else {
            control.possibleValues = ['seger-fabian', 'bierlachs'];
            control.enable();
          }
        }),
        toVoid()
      );
    };
  }
}
