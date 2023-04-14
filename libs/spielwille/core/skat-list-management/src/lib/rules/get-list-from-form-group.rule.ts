import { SkatList } from '@kbru/spielwille/data-access/skat-lists';
import { formatISO } from 'date-fns';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

export const getListFromFormGroup = (
  formGroup: SkatListFormGroup
): SkatList => {
  if (!formGroup.valid) {
    throw new Error('could not create list');
  }

  const calculationType = formGroup.value.calculationType;
  const spitzen = formGroup.value.spitzen;
  if (!calculationType || !spitzen) {
    throw new Error('could not create list');
  }

  return {
    created: formatISO(new Date()),
    gameIds: [],
    playerIds: formGroup.value.playerIds ?? [],
    status: null,
    rules: {
      addOn: formGroup.value.addOn ?? null,
      calculationType,
      spitzen,
      maxSets: formGroup.value.maxSets ?? null,
      centPerPoint: formGroup.value.centPerPoint ?? 0,
      saechsischeSpitze: formGroup.value.saechsischeSpitze ?? false,
      thresholdAnnouncementWithoutHand:
        formGroup.value.thresholdAnnouncementWithoutHand ?? false,
      maxSpritze: formGroup.value.hirsch
        ? 'hirsch'
        : formGroup.value.re
        ? 're'
        : formGroup.value.kontra
        ? 'kontra'
        : null,
      ramsch: formGroup.value.ramsch
        ? {
            geschoben: formGroup.value.ramschSchieben ?? false,
            jungfrau: formGroup.value.ramschJungfrau ?? false,
          }
        : false,
      bockSets: formGroup.value.bockSets
        ? {
            kontraRe: formGroup.value.autoBockKontraRe ?? false,
            kontraLost: formGroup.value.autoBockKontraLost ?? false,
            ramsch: formGroup.value.ramschSets
              ? {
                  geschoben: formGroup.value.ramschSetsSchieben ?? false,
                  jungfrau: formGroup.value.ramschSetsJungfrau ?? false,
                }
              : false,
          }
        : false,
    },
  };
};
