import { FormControl, FormGroup } from '@angular/forms';

import { CalculationTypeFormControl } from './form-controls/calculation-type.form-control';
import { CentPerPointFormControl } from './form-controls/cent-per-point.form-control';
import { HirschFormControl } from './form-controls/hirsch.form-control';
import { KontraReFormControl } from './form-controls/kontra-re.form-control';
import { MaxSetsFormControl } from './form-controls/max-sets.form-control';
import { PlayerIdsFormControl } from './form-controls/player-ids.form-control';
import { SpitzenFormControl } from './form-controls/spitzen.form-control';
import { ThresholdAnnouncementWithoutHandControl } from './form-controls/threshold-announcement-without-hand.form-control';

export class SkatListForm extends FormGroup<{
  groupId: FormControl<string | null>;
  playerIds: PlayerIdsFormControl;
  calculationType: CalculationTypeFormControl;
  spitzen: SpitzenFormControl;
  maxSets: MaxSetsFormControl;
  centPerPoint: CentPerPointFormControl;
  kontraRe: KontraReFormControl;
  hirsch: HirschFormControl;
  thresholdAnnouncementWithoutHand: ThresholdAnnouncementWithoutHandControl;
}> {}
