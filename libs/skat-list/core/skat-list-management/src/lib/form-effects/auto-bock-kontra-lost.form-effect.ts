import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const autoBockKontraLostFormEffect =
  (): FormEffect<SkatListForm> => (form) => {
    return form.controls.bockSets.valueChanges.pipe(
      startWith(form.controls.bockSets.value),
      map((bockSets) => {
        if (bockSets && form.controls.autoBockKontraLost.disabled) {
          form.controls.autoBockKontraLost.enable();
          form.controls.autoBockKontraLost.setValue(true);
        }
        if (!bockSets && form.controls.autoBockKontraLost.enabled) {
          form.controls.autoBockKontraLost.disable();
          form.controls.autoBockKontraLost.setValue(false);
        }
      })
    );
  };
