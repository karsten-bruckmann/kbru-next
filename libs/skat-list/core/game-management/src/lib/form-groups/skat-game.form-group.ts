import { FormGroup } from '@angular/forms';
import { SkatGame } from '@kbru/skat-list/data-access/skat-games';

import { ListIdFormControl } from '../form-controls/list-id.form-control';
import { PlayerIdFormControl } from '../form-controls/player-id.form-control';

export class SkatGameFormGroup extends FormGroup<{
  listId: ListIdFormControl;
  playerId: PlayerIdFormControl;
}> {
  public get skatGame(): SkatGame {
    return {
      playerId: this.controls.playerId.value || '',
    };
  }
}
