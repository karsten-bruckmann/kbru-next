import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { SkatList } from '@kbru/spielwille/data-access/skat-lists';
import { EMPTY } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

@Injectable({ providedIn: 'root' })
export class SpitzenFormControl extends FormControl<
  SkatList['rules']['spitzen'] | null
> {
  constructor() {
    super(null, (control) => {
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
    });
  }

  public possibleValues: SkatList['rules']['spitzen'][] = [];

  public formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      form.controls.spitzen.setValue(11);
      form.controls.spitzen.possibleValues = [4, 11];
      return EMPTY;
    };
  }
}
