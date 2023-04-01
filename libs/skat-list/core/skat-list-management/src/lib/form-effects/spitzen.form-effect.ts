import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { EMPTY } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const spitzenFormEffect = (): FormEffect<SkatListForm> => (form) => {
  form.controls.spitzen.possibleValues = [4, 11];
  return EMPTY;
};
