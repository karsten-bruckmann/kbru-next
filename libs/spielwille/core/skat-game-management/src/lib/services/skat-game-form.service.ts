import { Injectable } from '@angular/core';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';

import { skatGameFormSubmittedAction } from '../actions/skat-game-form-submitted.action';
import { AddsBockSetControl } from '../form-controls/adds-bock-set.form-control';
import { GameTypeFormControl } from '../form-controls/game-type.form-control';
import { HandFormControl } from '../form-controls/hand.form-control';
import { ListIdFormControl } from '../form-controls/list-id.form-control';
import { NullTypeFormControl } from '../form-controls/null-game-type.form-control';
import { PlayerIndexFormControl } from '../form-controls/player-index.form-control';
import { RamschPointsFormControl } from '../form-controls/ramsch-points.form-control';
import { SpitzenFormControl } from '../form-controls/spitzen.form-control';
import { SpritzeFormControl } from '../form-controls/spritze.form-control';
import { ThresholdFormControl } from '../form-controls/threshold.form-control';
import { ThresholdAnnouncedFormControl } from '../form-controls/threshold-announced.form-control';
import { WonFormControl } from '../form-controls/won.form-control';
import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { getGameFromFormGroup } from '../rules/get-game-from-form-group.rule';
import { listSelector } from '../selectors/list.selector';

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

    const game = getGameFromFormGroup(form);

    this.store$.dispatch(
      skatGameFormSubmittedAction({
        game,
        listId: form.value.listId,
      })
    );
  }

  public getForm$(listId: string): Observable<SkatGameFormGroup> {
    return this.store$.select(listSelector(listId)).pipe(
      filterNullish(),
      switchMap((list) =>
        createEffectAwareForm(
          new SkatGameFormGroup({
            listId: new ListIdFormControl(listId, {
              asyncValidators: [
                ListIdFormControl.getAsyncValidator(this.store$),
              ],
            }),
            playerIndex: new PlayerIndexFormControl(null, {
              asyncValidators: [
                PlayerIndexFormControl.getAsyncValidator(listId, this.store$),
              ],
            }),
            gameType: new GameTypeFormControl(
              null,
              GameTypeFormControl.getValidator(list)
            ),
            won: new WonFormControl(true, WonFormControl.getValidator()),
          }),
          [
            ListIdFormControl.formEffect(),
            PlayerIndexFormControl.formEffect(list),
            GameTypeFormControl.formEffect(list),
            SpitzenFormControl.formEffect(list),
            HandFormControl.formEffect(list),
            ThresholdFormControl.formEffect(),
            ThresholdAnnouncedFormControl.formEffect(list),
            SpritzeFormControl.formEffect(list),
            NullTypeFormControl.formEffect(),
            RamschPointsFormControl.formEffect(),
            AddsBockSetControl.formEffect(list),
            WonFormControl.formEffect(),
          ]
        )
      )
    );
  }
}
