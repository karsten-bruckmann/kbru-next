import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { controlValue$ } from '@kbru/shared/utils/angular-utils';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { SkatList } from '@kbru/spielwille/data-access/skat-lists';
import { tap } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

@Injectable({ providedIn: 'root' })
export class CalculationTypeFormControl extends FormControl<
  SkatList['rules']['calculationType'] | null
> {
  constructor() {
    super(null, (control) => {
      if (!control.value) {
        return { required: true };
      }
      if (
        typeof control.value !== 'string' &&
        control.value !== 'seger-fabian' &&
        control.value !== 'classic' &&
        control.value !== 'bierlachs'
      ) {
        return { type: true };
      }

      return null;
    });
  }

  public possibleValues: SkatList['rules']['calculationType'][] = [];

  public formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      const control = form.controls.calculationType;
      control.setValue('seger-fabian');
      return controlValue$(form.controls.addOn).pipe(
        tap((addOn) => {
          if (addOn === 'romanow') {
            control.setValue('bierlachs');
            control.possibleValues = ['bierlachs'];
            control.disable();
          } else {
            control.possibleValues = ['seger-fabian', 'classic', 'bierlachs'];
            control.enable();
          }
        }),
        toVoid()
      );
    };
  }
}
