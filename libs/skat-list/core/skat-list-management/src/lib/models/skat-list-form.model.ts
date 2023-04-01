import { FormControl, FormGroup } from '@angular/forms';

import { AutoBockKontraLostFormControl } from './form-controls/auto-bock-kontra-lost.form-control';
import { AutoBockKontraReFormControl } from './form-controls/auto-bock-kontra-re.form-control';
import { BockSetsFormControl } from './form-controls/bock-sets.form-control';
import { CalculationTypeFormControl } from './form-controls/calculation-type.form-control';
import { CentPerPointFormControl } from './form-controls/cent-per-point.form-control';
import { HirschFormControl } from './form-controls/hirsch.form-control';
import { JungfrauFormControl } from './form-controls/jungfrau.form-control';
import { KontraReFormControl } from './form-controls/kontra-re.form-control';
import { MaxSetsFormControl } from './form-controls/max-sets.form-control';
import { PlayerIdsFormControl } from './form-controls/player-ids.form-control';
import { RamschFormControl } from './form-controls/ramsch.form-control';
import { SaechsischeSpitzeFormControl } from './form-controls/saechsische-spitze.form-control';
import { SchiebeRamschFormControl } from './form-controls/schiebe-ramsch.form-control';
import { SpitzenFormControl } from './form-controls/spitzen.form-control';
import { ThresholdAnnouncementWithoutHandControl } from './form-controls/threshold-announcement-without-hand.form-control';

export class SkatListForm extends FormGroup<{
  groupId: FormControl<string | null>;
  playerIds: PlayerIdsFormControl;
  calculationType: CalculationTypeFormControl;
  spitzen: SpitzenFormControl;
  saechsischeSpitze: SaechsischeSpitzeFormControl;
  maxSets: MaxSetsFormControl;
  centPerPoint: CentPerPointFormControl;
  kontraRe: KontraReFormControl;
  hirsch: HirschFormControl;
  ramsch: RamschFormControl;
  schiebeRamsch: SchiebeRamschFormControl;
  jungfrau: JungfrauFormControl;
  bockSets: BockSetsFormControl;
  ramschSets: RamschFormControl;
  autoBockKontraRe: AutoBockKontraReFormControl;
  autoBockKontraLost: AutoBockKontraLostFormControl;
  thresholdAnnouncementWithoutHand: ThresholdAnnouncementWithoutHandControl;
}> {}
