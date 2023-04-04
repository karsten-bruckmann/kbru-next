import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const ramschSetsSchiebenFormEffect =
  (): FormEffect<SkatListForm> => (form) => {
    return form.controls.ramschSets.valueChanges.pipe(
      startWith(form.controls.ramschSets.value),
      map((ramschSets) => {
        if (ramschSets && form.controls.ramschSetsSchieben.disabled) {
          form.controls.ramschSetsSchieben.enable();
          form.controls.ramschSetsSchieben.setValue(true);
        }
        if (!ramschSets && form.controls.ramschSetsSchieben.enabled) {
          form.controls.ramschSetsSchieben.disable();
          form.controls.ramschSetsSchieben.setValue(false);
        }
      })
    );
  };
