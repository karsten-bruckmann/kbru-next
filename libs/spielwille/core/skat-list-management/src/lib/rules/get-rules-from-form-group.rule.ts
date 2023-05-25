import { SkatList } from '@kbru/spielwille/data-access/skat-lists';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';

export const getRulesFromFormGroup = (
  formGroup: SkatListFormGroup
): SkatList['rules'] => {
  const formValue = formGroup.getRawValue();

  const calculationType = formValue.calculationType;
  const spitzen = formValue.spitzen;
  if (!calculationType || !spitzen) {
    throw new Error('could not create list');
  }

  return {
    addOn: formValue.addOn ?? null,
    calculationType,
    spitzen,
    maxSets: formValue.maxSets ?? null,
    centPerPoint: formValue.centPerPoint ?? 0,
    saechsischeSpitze: formValue.saechsischeSpitze ?? false,
    thresholdAnnouncementWithoutHand:
      formValue.thresholdAnnouncementWithoutHand ?? false,
    maxSpritze: formValue.hirsch
      ? 'hirsch'
      : formValue.re
      ? 're'
      : formValue.kontra
      ? 'kontra'
      : null,
    ramsch: formValue.ramsch
      ? {
          geschoben: formValue.ramschSchieben ?? false,
          jungfrau: formValue.ramschJungfrau ?? false,
        }
      : false,
    bockSets: formValue.bockSets
      ? {
          kontraRe: formValue.autoBockKontraRe ?? false,
          kontraLost: formValue.autoBockKontraLost ?? false,
          ramsch: formValue.ramschSets
            ? {
                geschoben: formValue.ramschSetsSchieben ?? false,
                jungfrau: formValue.ramschSetsJungfrau ?? false,
              }
            : false,
        }
      : false,
  };
};
