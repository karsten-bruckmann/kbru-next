import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { combineLatest, map, startWith } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const bockFormEffect = (): FormEffect<SkatListForm> => (form) => {
  return combineLatest([
    form.controls.kontra.valueChanges.pipe(
      startWith(form.controls.kontra.value)
    ),
    form.controls.re.valueChanges.pipe(startWith(form.controls.re.value)),
  ]).pipe(
    map(([kontra, re]) => {
      if ((kontra || re) && form.controls.bock.disabled) {
        form.controls.bock.enable();
        form.controls.bock.setValue(true);
      }
      if ((!kontra || !re) && form.controls.bock.enabled) {
        form.controls.bock.disable();
        form.controls.bock.setValue(false);
      }
    })
  );
};
