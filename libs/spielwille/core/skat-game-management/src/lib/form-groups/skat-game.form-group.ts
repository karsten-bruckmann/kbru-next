import { FormGroup } from '@angular/forms';

import { GameTypeFormControl } from '../form-controls/game-type.form-control';
import { HandFormControl } from '../form-controls/hand.form-control';
import { ListIdFormControl } from '../form-controls/list-id.form-control';
import { NullTypeFormControl } from '../form-controls/null-game-type.form-control';
import { PlayerIndexFormControl } from '../form-controls/player-index.form-control';
import { SpitzenFormControl } from '../form-controls/spitzen.form-control';
import { SpritzeFormControl } from '../form-controls/spritze.form-control';
import { ThresholdFormControl } from '../form-controls/threshold.form-control';
import { ThresholdAnnouncedFormControl } from '../form-controls/threshold-announced.form-control';

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
}> {}
