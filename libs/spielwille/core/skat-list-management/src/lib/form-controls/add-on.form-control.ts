import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { AddOn } from '@kbru/spielwille/data-access/skat-lists';
import { EMPTY } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

@Injectable({ providedIn: 'root' })
export class AddOnFormControl extends FormControl<AddOn | null> {
  constructor() {
    super(null, (control) => {
      if (![null, 'romanow'].includes(control.value)) {
        return { type: true };
      }

      return null;
    });
  }

  public possibleValues: AddOn[] = [];

  public formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      form.controls.addOn.setValue(null);
      form.controls.addOn.possibleValues = [null, 'romanow'];
      return EMPTY;
    };
  }
}
