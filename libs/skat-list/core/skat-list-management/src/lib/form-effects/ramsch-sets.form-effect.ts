import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const ramschSetsFormEffect = (): FormEffect<SkatListForm> => (form) => {
  return form.controls.bockSets.valueChanges.pipe(
    startWith(form.controls.bockSets.value),
    map((bockSets) => {
      if (bockSets && form.controls.ramschSets.disabled) {
        form.controls.ramschSets.enable();
        form.controls.ramschSets.setValue(true);
      }
      if (!bockSets && form.controls.ramschSets.enabled) {
        form.controls.ramschSets.disable();
        form.controls.ramschSets.setValue(false);
      }
    })
  );
};
