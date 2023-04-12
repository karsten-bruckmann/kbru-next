import { FormGroup } from '@angular/forms';
import { v4 as uuid } from 'uuid';

import { ListIdFormControl } from '../form-controls/list-id.form-control';
import { PlayerIndexFormControl } from '../form-controls/player-index.form-control';
import { Game } from '../models/game.model';

export class SkatGameFormGroup extends FormGroup<{
  listId: ListIdFormControl;
  playerIndex: PlayerIndexFormControl;
}> {
  public get game(): Game | null {
    if (this.controls.playerIndex.value === null) {
      return null;
    }

    return {
      id: uuid(),
      gameType: 'clubs',
      playerIndex: this.controls.playerIndex.value,
      spitzen: 4,
    };
  }
}
