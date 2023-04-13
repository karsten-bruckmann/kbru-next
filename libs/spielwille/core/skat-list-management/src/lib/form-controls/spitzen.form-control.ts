import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { SkatList } from '@kbru/spielwille/data-access/skat-lists';
import { EMPTY } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

export class SpitzenFormControl extends FormControl<
  SkatList['rules']['spitzen'] | null
> {
  public possibleValues: SkatList['rules']['spitzen'][] = [];

  public static get validator(): ValidatorFn {
    return (control) => {
      if (!control.value) {
        return { required: true };
      }
      if (
        typeof control.value !== 'number' &&
        control.value !== 4 &&
        control.value !== 11
      ) {
        return { type: true };
      }

      return null;
    };
  }

  public static formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      form.controls.spitzen.setValue(11);
      form.controls.spitzen.possibleValues = [4, 11];
      return EMPTY;
    };
  }
}
