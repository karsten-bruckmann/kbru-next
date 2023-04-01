import { FormControl, FormGroup } from '@angular/forms';

import { CalculationTypeFormControl } from './form-controls/calculation-type.form-control';
import { PlayerIdsFormControl } from './form-controls/player-ids.form-control';
import { SpitzenFormControl } from './form-controls/spitzen.form-control';

export class SkatListForm extends FormGroup<{
  groupId: FormControl<string | null>;
  playerIds: PlayerIdsFormControl;
  calculationType: CalculationTypeFormControl;
  spitzen: SpitzenFormControl;
}> {}
