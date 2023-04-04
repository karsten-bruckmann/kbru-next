import { FormControl, FormGroup } from '@angular/forms';

import {
  AutoBockKontraLostFormControl,
  AutoBockKontraReFormControl,
  BockFormControl,
  BockSetsFormControl,
  CalculationTypeFormControl,
  CentPerPointFormControl,
  HirschFormControl,
  KontraFormControl,
  MaxSetsFormControl,
  PlayerIdsFormControl,
  RamschFormControl,
  RamschJungfrauFormControl,
  RamschSchiebenFormControl,
  ReFormControl,
  SaechsischeSpitzeFormControl,
  SpitzenFormControl,
  ThresholdAnnouncementWithoutHandControl,
} from './form-controls';
import { RamschSetsJungfrauFormControl } from './form-controls/ramsch-sets-jungfrau.form-control';

export class SkatListForm extends FormGroup<{
  groupId: FormControl<string | null>;
  playerIds: PlayerIdsFormControl;
  calculationType: CalculationTypeFormControl;
  spitzen: SpitzenFormControl;
  saechsischeSpitze: SaechsischeSpitzeFormControl;
  maxSets: MaxSetsFormControl;
  centPerPoint: CentPerPointFormControl;
  kontra: KontraFormControl;
  re: ReFormControl;
  bock: BockFormControl;
  hirsch: HirschFormControl;
  ramsch: RamschFormControl;
  ramschSchieben: RamschSchiebenFormControl;
  ramschJungfrau: RamschJungfrauFormControl;
  bockSets: BockSetsFormControl;
  ramschSets: RamschFormControl;
  ramschSetsSchieben: RamschSchiebenFormControl;
  ramschSetsJungfrau: RamschSetsJungfrauFormControl;
  autoBockKontraRe: AutoBockKontraReFormControl;
  autoBockKontraLost: AutoBockKontraLostFormControl;
  thresholdAnnouncementWithoutHand: ThresholdAnnouncementWithoutHandControl;
}> {}
