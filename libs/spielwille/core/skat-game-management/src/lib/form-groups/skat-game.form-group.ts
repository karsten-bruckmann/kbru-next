import { FormGroup } from '@angular/forms';
import { v4 as uuid } from 'uuid';

import { GameTypeFormControl } from '../form-controls/game-type.form-control';
import { HandFormControl } from '../form-controls/hand.form-control';
import { ListIdFormControl } from '../form-controls/list-id.form-control';
import { NullTypeFormControl } from '../form-controls/null-game-type.form-control';
import { PlayerIndexFormControl } from '../form-controls/player-index.form-control';
import { SpitzenFormControl } from '../form-controls/spitzen.form-control';
import { SpritzeFormControl } from '../form-controls/spritze.form-control';
import { ThresholdFormControl } from '../form-controls/threshold.form-control';
import { ThresholdAnnouncedFormControl } from '../form-controls/threshold-announced.form-control';
import { Game, gameSchema } from '../schemas/game.schema';

export class SkatGameFormGroup extends FormGroup<{
  listId: ListIdFormControl;
  playerIndex: PlayerIndexFormControl;
  gameType: GameTypeFormControl;
  spitzen?: SpitzenFormControl;
  hand?: HandFormControl;
  threshold?: ThresholdFormControl;
  thresholdAnnounced?: ThresholdAnnouncedFormControl;
  spritze?: SpritzeFormControl;
  nullType?: NullTypeFormControl;
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
