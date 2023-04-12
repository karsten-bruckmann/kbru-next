import { FormGroup } from '@angular/forms';
import { v4 as uuid } from 'uuid';

import { GameTypeFormControl } from '../form-controls/game-type.form-control';
import { ListIdFormControl } from '../form-controls/list-id.form-control';
import { NullGameFormControl } from '../form-controls/null-game.form-control';
import { PlayerIndexFormControl } from '../form-controls/player-index.form-control';
import { SpitzenFormControl } from '../form-controls/spitzen.form-control';
import { Game } from '../models/game.model';
import { gameSchema } from '../schemas/game.schema';

export class SkatGameFormGroup extends FormGroup<{
  listId: ListIdFormControl;
  playerIndex: PlayerIndexFormControl;
  gameType: GameTypeFormControl;
  spitzen?: SpitzenFormControl;
  nullGame?: NullGameFormControl;
}> {
  public get game(): Game | null {
    if (this.controls.playerIndex.value === null) {
      return null;
    }

    try {
      return gameSchema.parse({
        id: uuid(),
        ...this.value,
      });
    } catch (e: unknown) {
      console.log(e);
      return null;
    }
  }
}
