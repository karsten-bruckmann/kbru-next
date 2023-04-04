import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { combineLatest, map, startWith } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const reFormEffect = (): FormEffect<SkatListForm> => (form) => {
  return combineLatest([
    form.controls.kontra.valueChanges.pipe(
      startWith(form.controls.kontra.value)
    ),
  ]).pipe(
    map(([kontra]) => {
      if (kontra && form.controls.re.disabled) {
        form.controls.re.enable();
        form.controls.re.setValue(true);
      }
      if (!kontra && form.controls.re.enabled) {
        form.controls.re.disable();
        form.controls.re.setValue(false);
      }
    })
  );
};
