import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const ramschJungfrauFormEffect =
  (): FormEffect<SkatListForm> => (form) => {
    return form.controls.ramsch.valueChanges.pipe(
      startWith(form.controls.ramsch.value),
      map((ramsch) => {
        if (ramsch && form.controls.ramschJungfrau.disabled) {
          form.controls.ramschJungfrau.enable();
          form.controls.ramschJungfrau.setValue(true);
        }
        if (!ramsch && form.controls.ramschJungfrau.enabled) {
          form.controls.ramschJungfrau.disable();
          form.controls.ramschJungfrau.setValue(false);
        }
      })
    );
  };
