import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { HirschFormControl } from '../models/form-controls/hirsch.form-control';
import { SkatListForm } from '../models/skat-list-form.model';

export const hirschFormEffect = (): FormEffect<SkatListForm> => (form) => {
  if (!form.controls.kontraRe) {
    form.addControl('hirsch', new HirschFormControl(true));
  }
  return form.controls.kontraRe.valueChanges.pipe(
    startWith(form.controls.kontraRe.value),
    map((kontraRe) => {
      if (kontraRe && form.controls.hirsch.disabled) {
        form.controls.hirsch.enable();
        form.controls.hirsch.setValue(true);
      }
      if (!kontraRe && form.controls.hirsch.enabled) {
        form.controls.hirsch.disable();
        form.controls.hirsch.setValue(false);
      }
    })
  );
};
