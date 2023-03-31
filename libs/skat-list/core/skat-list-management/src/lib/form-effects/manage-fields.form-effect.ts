import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { map, startWith } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const manageFields: FormEffect<SkatListForm> = (form) => {
  return form.valueChanges.pipe(
    startWith(form.value),
    map(() => {
      form.controls['playerIds'].possibleValues = ['a', 'b', 'c'];

      if (form.controls['playerIds'].valid) {
        form.visibleControls.set('calculationType', false);
      }
    })
  );
};
