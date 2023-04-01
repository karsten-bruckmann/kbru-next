import { FormControl, FormGroup } from '@angular/forms';

export class PlayerForm extends FormGroup<{
  groupIds: FormControl<string[] | null>;
  playerId: FormControl<string | null>;
  playerName: FormControl<string | null>;
}> {}
