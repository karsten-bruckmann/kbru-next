import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { EMPTY } from 'rxjs';

import { PlayerFormGroup } from '../form-groups/player.form-group';

export class PlayerNameFormControl extends FormControl<string | null> {
  public static get validator(): ValidatorFn {
    return (control) => {
      if (!control.value) {
        return {
          required: true,
        };
      }
      if (typeof control.value !== 'string') {
        return {
          type: true,
        };
      }
      if (control.value.length < 2 || control.value.length > 50) {
        return {
          length: true,
        };
      }
      if (!control.value.match(/^[ 0-9a-zA-Z_.-]*$/)) {
        return {
          characters: true,
        };
      }

      return null;
    };
  }

  public static formEffect(): FormEffect<PlayerFormGroup> {
    return () => {
      return EMPTY;
    };
  }
}
