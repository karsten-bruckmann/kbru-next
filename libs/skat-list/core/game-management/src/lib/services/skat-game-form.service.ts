import { Injectable } from '@angular/core';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { SkatGame } from '@kbru/skat-list/data-access/skat-games';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { skatGameFormSubmittedAction } from '../actions/skat-game-form-submitted.action';
import { ListIdFormControl } from '../form-controls/list-id.form-control';
import { PlayerIdFormControl } from '../form-controls/player-id.form-control';
import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';

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

    const skatGame: SkatGame | null = form.skatGame;
    if (!skatGame) {
      throw new Error('error getting list value');
    }

    this.store$.dispatch(
      skatGameFormSubmittedAction({
        skatGame,
        uuid: uuid(),
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
        playerId: new PlayerIdFormControl(null, {
          asyncValidators: [
            PlayerIdFormControl.getAsyncValidator(listId, this.store$),
          ],
        }),
      }),
      [
        ListIdFormControl.formEffect(),
        PlayerIdFormControl.formEffect(this.store$),
      ]
    );
  }
}
