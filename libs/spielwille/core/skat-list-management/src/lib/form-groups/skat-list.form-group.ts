import { FormGroup } from '@angular/forms';

import { AddOnFormControl } from '../form-controls/add-on.form-control';
import { AutoBockKontraLostFormControl } from '../form-controls/auto-bock-kontra-lost.form-control';
import { AutoBockKontraReFormControl } from '../form-controls/auto-bock-kontra-re.form-control';
import { BockSetsFormControl } from '../form-controls/bock-sets.form-control';
import { CalculationTypeFormControl } from '../form-controls/calculation-type.form-control';
import { CentPerPointFormControl } from '../form-controls/cent-per-point.form-control';
import { GroupIdFormControl } from '../form-controls/group-id.form-control';
import { HirschFormControl } from '../form-controls/hirsch.form-control';
import { KontraFormControl } from '../form-controls/kontra.form-control';
import { MaxSetsFormControl } from '../form-controls/max-sets.form-control';
import { PlayerIdsFormControl } from '../form-controls/player-ids.form-control';
import { RamschFormControl } from '../form-controls/ramsch.form-control';
import { RamschJungfrauFormControl } from '../form-controls/ramsch-jungfrau.form-control';
import { RamschSchiebenFormControl } from '../form-controls/ramsch-schieben.form-control';
import { RamschSetsJungfrauFormControl } from '../form-controls/ramsch-sets-jungfrau.form-control';
import { ReFormControl } from '../form-controls/re.form-control';
import { SaechsischeSpitzeFormControl } from '../form-controls/saechsische-spitze.form-control';
import { SpitzenFormControl } from '../form-controls/spitzen.form-control';
import { ThresholdAnnouncementWithoutHandControl } from '../form-controls/threshold-announcement-without-hand.form-control';

export class SkatListFormGroup extends FormGroup<{
  groupId: GroupIdFormControl;
  playerIds: PlayerIdsFormControl;
  addOn: AddOnFormControl;
  calculationType: CalculationTypeFormControl;
  spitzen: SpitzenFormControl;
  saechsischeSpitze: SaechsischeSpitzeFormControl;
  maxSets: MaxSetsFormControl;
  centPerPoint: CentPerPointFormControl;
  kontra: KontraFormControl;
  re: ReFormControl;
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
