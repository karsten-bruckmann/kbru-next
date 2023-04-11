import { FormControl, ValidatorFn } from '@angular/forms';
import { controlValue$ } from '@kbru/shared/utils/angular-utils';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { AddOn, SkatList } from '@kbru/skat-list/data-access/skat-lists';
import { tap } from 'rxjs';

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
      const control = form.controls.maxSets;
      control.setValue(3);
      return controlValue$(form.controls.addOn).pipe(
        tap((addOn) => {
          if (addOn === AddOn.Romanow) {
            control.setValue(3);
            control.possibleValues = [3];
            control.disable();
          } else {
            control.possibleValues = [null, 1, 3];
            control.enable();
          }
        }),
        toVoid()
      );
    };
  }
}
