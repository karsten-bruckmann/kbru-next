import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { EMPTY } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const bockSetsFormEffect = (): FormEffect<SkatListForm> => (form) => {
  form.controls.bockSets.setValue(false);
  return EMPTY;
};
