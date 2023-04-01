import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { EMPTY } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const calculationTypesFormEffect =
  (): FormEffect<SkatListForm> => (form) => {
    form.controls.calculationType.possibleValues = [
      'bierlachs',
      'seger-fabian',
    ];
    return EMPTY;
  };
