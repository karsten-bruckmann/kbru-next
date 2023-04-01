import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const schiebeRamschFormEffect =
  (): FormEffect<SkatListForm> => (form) => {
    return form.controls.ramsch.valueChanges.pipe(
      startWith(form.controls.ramsch.value),
      map((ramsch) => {
        if (ramsch && form.controls.schiebeRamsch.disabled) {
          form.controls.schiebeRamsch.enable();
          form.controls.schiebeRamsch.setValue(true);
        }
        if (!ramsch && form.controls.schiebeRamsch.enabled) {
          form.controls.schiebeRamsch.disable();
          form.controls.schiebeRamsch.setValue(false);
        }
      })
    );
  };
