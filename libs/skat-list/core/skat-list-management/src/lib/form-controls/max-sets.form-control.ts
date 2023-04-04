import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { SkatList } from '@kbru/skat-list/data-access/skat-lists';
import { EMPTY } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

export class MaxSetsFormControl extends FormControl<
  SkatList['rules']['maxSets']
> {
  public possibleValues: SkatList['rules']['maxSets'][] = [];

  public static get validator(): ValidatorFn {
    return (control) => {
      if (!control.value) {
        return { required: true };
      }
      if (
        control.value !== undefined &&
        control.value !== 1 &&
        control.value !== 3
      ) {
        return { type: true };
      }

      return null;
    };
  }

  public static formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      form.controls.maxSets.setValue(3);
      form.controls.maxSets.possibleValues = [null, 1, 3];
      return EMPTY;
    };
  }
}
