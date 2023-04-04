import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { SkatList } from '@kbru/skat-list/data-access/skat-lists';
import { EMPTY } from 'rxjs';

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
      form.controls.calculationType.setValue('seger-fabian');
      form.controls.calculationType.possibleValues = [
        'bierlachs',
        'seger-fabian',
      ];
      return EMPTY;
    };
  }
}
