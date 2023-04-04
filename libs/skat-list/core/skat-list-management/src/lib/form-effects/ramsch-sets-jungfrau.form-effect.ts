import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const ramschSetsJungfrauFormEffect =
  (): FormEffect<SkatListForm> => (form) => {
    return form.controls.ramschSets.valueChanges.pipe(
      startWith(form.controls.ramschSets.value),
      map((ramschSets) => {
        if (ramschSets && form.controls.ramschSetsJungfrau.disabled) {
          form.controls.ramschSetsJungfrau.enable();
          form.controls.ramschSetsJungfrau.setValue(true);
        }
        if (!ramschSets && form.controls.ramschSetsJungfrau.enabled) {
          form.controls.ramschSetsJungfrau.disable();
          form.controls.ramschSetsJungfrau.setValue(false);
        }
      })
    );
  };
