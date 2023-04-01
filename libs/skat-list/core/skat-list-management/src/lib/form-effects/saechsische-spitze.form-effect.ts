import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { EMPTY } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const saechsischeSpitzeFormEffect =
  (): FormEffect<SkatListForm> => (form) => {
    form.controls.saechsischeSpitze.setValue(false);
    return EMPTY;
  };
