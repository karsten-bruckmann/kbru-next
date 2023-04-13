import { FormControl, ValidatorFn } from '@angular/forms';
import { controlValue$ } from '@kbru/shared/utils/angular-utils';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { SkatList } from '@kbru/spielwille/data-access/skat-lists';
import { tap } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

export class CentPerPointFormControl extends FormControl<
  SkatList['rules']['centPerPoint'] | null
> {
  public possibleValues: SkatList['rules']['centPerPoint'][] = [];

  public static get validator(): ValidatorFn {
    return (control) => {
      if (typeof control.value !== 'number') {
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
      const control = form.controls.centPerPoint;
      control.setValue(0.1);
      return controlValue$(form.controls.addOn).pipe(
        tap((addOn) => {
          if (addOn === 'romanow') {
            control.setValue(0);
            control.possibleValues = [0];
            control.disable();
          } else {
            control.possibleValues = [0, 1, 0.5, 0.25, 0.1];
            control.enable();
          }
        }),
        toVoid()
      );
    };
  }
}
