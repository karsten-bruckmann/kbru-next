import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { EMPTY } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';

export const thresholdAnnouncementWithoutHandFormEffect =
  (): FormEffect<SkatListForm> => (form) => {
    form.controls.thresholdAnnouncementWithoutHand.setValue(false);
    return EMPTY;
  };
