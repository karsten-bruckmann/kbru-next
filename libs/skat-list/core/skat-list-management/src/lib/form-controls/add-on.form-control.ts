import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { AddOn } from '@kbru/skat-list/data-access/skat-lists';
import { EMPTY } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

export class AddOnFormControl extends FormControl<AddOn | null> {
  public possibleValues: AddOn[] = [];

  public static get validator(): ValidatorFn {
    return (control) => {
      if (!control.value) {
        return { required: true };
      }
      if (!Object.values(AddOn).includes(control.value)) {
        return { type: true };
      }

      return null;
    };
  }

  public static formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      form.controls.addOn.setValue(AddOn.None);
      form.controls.addOn.possibleValues = [AddOn.None, AddOn.Romanow];
      return EMPTY;
    };
  }
}
