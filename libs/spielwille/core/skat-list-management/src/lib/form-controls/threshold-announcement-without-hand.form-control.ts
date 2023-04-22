import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { EMPTY } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { requiredBooleanValidatorFunction } from '../validator-functions/required-boolean.validator-function';

@Injectable({ providedIn: 'root' })
export class ThresholdAnnouncementWithoutHandControl extends FormControl<
  boolean | null
> {
  constructor() {
    super(null, requiredBooleanValidatorFunction);
  }

  public formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      form.controls.thresholdAnnouncementWithoutHand.setValue(false);
      return EMPTY;
    };
  }
}
