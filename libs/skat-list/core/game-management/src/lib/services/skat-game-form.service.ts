import { Injectable } from '@angular/core';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { skatGameFormSubmittedAction } from '../actions/skat-game-form-submitted.action';
import { ListIdFormControl } from '../form-controls/list-id.form-control';
import { PlayerIndexFormControl } from '../form-controls/player-index.form-control';
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
      }),
      [
        ListIdFormControl.formEffect(),
        PlayerIndexFormControl.formEffect(this.store$),
      ]
    );
  }
}
