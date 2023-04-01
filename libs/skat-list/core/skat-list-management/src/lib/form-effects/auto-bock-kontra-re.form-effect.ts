import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const autoBockKontraReFormEffect =
  (): FormEffect<SkatListForm> => (form) => {
    return form.controls.bockSets.valueChanges.pipe(
      startWith(form.controls.bockSets.value),
      map((bockSets) => {
        if (bockSets && form.controls.autoBockKontraRe.disabled) {
          form.controls.autoBockKontraRe.enable();
          form.controls.autoBockKontraRe.setValue(true);
        }
        if (!bockSets && form.controls.autoBockKontraRe.enabled) {
          form.controls.autoBockKontraRe.disable();
          form.controls.autoBockKontraRe.setValue(false);
        }
      })
    );
  };
