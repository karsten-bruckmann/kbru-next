import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { EMPTY } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const maxSetsFormEffect = (): FormEffect<SkatListForm> => (form) => {
  form.controls.maxSets.setValue(3);
  form.controls.maxSets.possibleValues = [null, 1, 3];
  return EMPTY;
};
