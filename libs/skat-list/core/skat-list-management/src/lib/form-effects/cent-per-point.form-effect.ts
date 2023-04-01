import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { EMPTY } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const centPerPointFormEffect =
  (): FormEffect<SkatListForm> => (form) => {
    form.controls.centPerPoint.setValue(0.1);
    form.controls.centPerPoint.possibleValues = [0, 1, 0.5, 0.25, 0.1];
    return EMPTY;
  };
