import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const ramschSchiebenFormEffect =
  (): FormEffect<SkatListForm> => (form) => {
    return form.controls.ramsch.valueChanges.pipe(
      startWith(form.controls.ramsch.value),
      map((ramsch) => {
        if (ramsch && form.controls.ramschSchieben.disabled) {
          form.controls.ramschSchieben.enable();
          form.controls.ramschSchieben.setValue(true);
        }
        if (!ramsch && form.controls.ramschSchieben.enabled) {
          form.controls.ramschSchieben.disable();
          form.controls.ramschSchieben.setValue(false);
        }
      })
    );
  };
