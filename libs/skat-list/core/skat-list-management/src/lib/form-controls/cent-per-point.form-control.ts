import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { SkatList } from '@kbru/skat-list/data-access/skat-lists';
import { EMPTY } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

export class CentPerPointFormControl extends FormControl<
  SkatList['rules']['centPerPoint'] | null
> {
  public possibleValues: SkatList['rules']['centPerPoint'][] = [];

  public static get validator(): ValidatorFn {
    return (control) => {
      if (!control.value) {
        return { required: true };
      }
      if (
        control.value !== 0 &&
        control.value !== 1 &&
        control.value !== 0.5 &&
        control.value !== 0.25 &&
        control.value !== 0.1
      ) {
        return { type: true };
      }

      return null;
    };
  }

  public static formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      form.controls.centPerPoint.setValue(0.1);
      form.controls.centPerPoint.possibleValues = [0, 1, 0.5, 0.25, 0.1];
      return EMPTY;
    };
  }
}
