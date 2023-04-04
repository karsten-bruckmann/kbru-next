import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { combineLatest, map, startWith } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const hirschFormEffect = (): FormEffect<SkatListForm> => (form) => {
  return combineLatest([
    form.controls.kontra.valueChanges.pipe(
      startWith(form.controls.kontra.value)
    ),
    form.controls.re.valueChanges.pipe(startWith(form.controls.re.value)),
    form.controls.bock.valueChanges.pipe(startWith(form.controls.bock.value)),
  ]).pipe(
    map(([kontra, re, bock]) => {
      if ((kontra || re || bock) && form.controls.hirsch.disabled) {
        form.controls.hirsch.enable();
        form.controls.hirsch.setValue(true);
      }
      if ((!kontra || !re || !bock) && form.controls.hirsch.enabled) {
        form.controls.hirsch.disable();
        form.controls.hirsch.setValue(false);
      }
    })
  );
};
