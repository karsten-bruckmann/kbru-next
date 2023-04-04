import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { EMPTY } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const kontraFormEffect = (): FormEffect<SkatListForm> => (form) => {
  form.controls.kontra.setValue(false);
  return EMPTY;
};
