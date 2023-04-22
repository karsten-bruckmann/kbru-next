import { ListPreset } from '../models/list-preset.model';

export const getDskvPreset = (): ListPreset => ({
  name: 'DSkV Regeln',
  rules: {
    addOn: null,
    autoBockKontraLost: false,
    autoBockKontraRe: false,
    bockSets: false,
    calculationType: 'seger-fabian',
    centPerPoint: 0,
    hirsch: false,
    kontra: false,
    maxSets: 3,
    ramsch: false,
    ramschJungfrau: false,
    ramschSchieben: false,
    ramschSets: false,
    ramschSetsJungfrau: false,
    ramschSetsSchieben: false,
    re: false,
    saechsischeSpitze: false,
    spitzen: 11,
    thresholdAnnouncementWithoutHand: false,
  },
});
