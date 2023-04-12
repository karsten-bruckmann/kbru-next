import { FormGroup } from '@angular/forms';
import { v4 } from 'uuid';

import { ListIdFormControl } from '../form-controls/list-id.form-control';
import { PlayerIdFormControl } from '../form-controls/player-id.form-control';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';

export class SkatGameFormGroup extends FormGroup<{
  listId: ListIdFormControl;
  playerId: PlayerIdFormControl;
}> {
  public getGame(listPlayers: Player[]): Game {
    return {
      id: v4(),
      player: listPlayers.find(
        (p) => p.id === this.controls.playerId.value
      ) || {
        id: '',
        name: 'unknown player',
      },
    };
  }
}
