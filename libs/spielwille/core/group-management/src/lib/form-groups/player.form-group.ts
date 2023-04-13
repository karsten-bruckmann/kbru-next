import { FormControl, FormGroup } from '@angular/forms';

import { PlayerNameFormControl } from '../form-controls/player-name.form-control';

export class PlayerFormGroup extends FormGroup<{
  groupIds: FormControl<string[] | null>;
  playerId: FormControl<string | null>;
  playerName: PlayerNameFormControl;
}> {}
