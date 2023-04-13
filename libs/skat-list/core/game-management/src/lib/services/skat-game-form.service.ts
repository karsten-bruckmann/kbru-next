import { Injectable } from '@angular/core';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { skatGameFormSubmittedAction } from '../actions/skat-game-form-submitted.action';
import { GameTypeFormControl } from '../form-controls/game-type.form-control';
import { HandFormControl } from '../form-controls/hand.form-control';
import { ListIdFormControl } from '../form-controls/list-id.form-control';
import { NullGameTypeFormControl } from '../form-controls/null-game-type.form-control';
import { PlayerIndexFormControl } from '../form-controls/player-index.form-control';
import { SpitzenFormControl } from '../form-controls/spitzen.form-control';
import { ThresholdFormControl } from '../form-controls/threshold.form-control';
import { ThresholdAnnouncedFormControl } from '../form-controls/threshold-announced.form-control';
import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class SkatGameFormService {
  constructor(private store$: Store) {}

  public submit(form: SkatGameFormGroup): void {
    if (!form.valid) {
      throw new Error('invalid form');
    }

    if (!form.value.listId) {
      throw new Error('no list id');
    }

    const game: Game | null = form.game;
    if (!game) {
      throw new Error('error getting list value');
    }

    this.store$.dispatch(
      skatGameFormSubmittedAction({
        game,
        listId: form.value.listId,
      })
    );
  }

  public getForm$(listId: string): Observable<SkatGameFormGroup> {
    return createEffectAwareForm(
      new SkatGameFormGroup({
        listId: new ListIdFormControl(listId, {
          asyncValidators: [ListIdFormControl.getAsyncValidator(this.store$)],
        }),
        playerIndex: new PlayerIndexFormControl(null, {
          asyncValidators: [
            PlayerIndexFormControl.getAsyncValidator(listId, this.store$),
          ],
        }),
        gameType: new GameTypeFormControl(null, GameTypeFormControl.validator),
      }),
      [
        ListIdFormControl.formEffect(),
        PlayerIndexFormControl.formEffect(this.store$),
        GameTypeFormControl.formEffect(),
        SpitzenFormControl.formEffect(),
        HandFormControl.formEffect(),
        ThresholdFormControl.formEffect(),
        ThresholdAnnouncedFormControl.formEffect(),
        NullGameTypeFormControl.formEffect(),
      ]
    );
  }
}
