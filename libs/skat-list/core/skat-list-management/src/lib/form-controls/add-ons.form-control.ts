import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { AddOn } from '@kbru/skat-list/data-access/skat-lists';
import { EMPTY } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

export class AddOnsFormControl extends FormControl<AddOn[] | null> {
  public possibleValues: AddOn[] = [];

  public static get validator(): ValidatorFn {
    return (control) => {
      if (!control.value) {
        return { required: true };
      }
      if (
        !Array.isArray(control.value) ||
        control.value.find((v) => !Object.values(AddOn).includes(v))
      ) {
        return { type: true };
      }

      return null;
    };
  }

  public static formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      form.controls.addOns.setValue([]);
      form.controls.addOns.possibleValues = [AddOn.Romanow];
      return EMPTY;
    };
  }
}
