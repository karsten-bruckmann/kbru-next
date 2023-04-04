import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { EMPTY } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const ramschFormEffect = (): FormEffect<SkatListForm> => (form) => {
  form.controls.spitzen.setValue(11);
  form.controls.spitzen.possibleValues = [4, 11];
  return EMPTY;
};
