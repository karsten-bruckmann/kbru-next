import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { EMPTY } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const kontraReFormEffect = (): FormEffect<SkatListForm> => (form) => {
  form.controls.kontraRe.setValue(false);
  return EMPTY;
};
