import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const jungfrauFormEffect = (): FormEffect<SkatListForm> => (form) => {
  return form.controls.ramsch.valueChanges.pipe(
    startWith(form.controls.ramsch.value),
    map((ramsch) => {
      if (ramsch && form.controls.jungfrau.disabled) {
        form.controls.jungfrau.enable();
        form.controls.jungfrau.setValue(true);
      }
      if (!ramsch && form.controls.jungfrau.enabled) {
        form.controls.jungfrau.disable();
        form.controls.jungfrau.setValue(false);
      }
    })
  );
};
