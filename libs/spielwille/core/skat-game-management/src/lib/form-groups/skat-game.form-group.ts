import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
import { getGameFromFormGroup } from '../rules/get-game-from-form-group.rule';

@Injectable({ providedIn: 'root' })
export class SkatGameFormGroup extends FormGroup<{
  listId: ListIdFormControl;
  playerIndex: PlayerIndexFormControl;
  gameType: GameTypeFormControl;
  addsBockSet?: AddsBockSetControl;
  // Standard Games
  spitzen?: SpitzenFormControl;
  hand?: HandFormControl;
  threshold?: ThresholdFormControl;
  thresholdAnnounced?: ThresholdAnnouncedFormControl;
  spritze?: SpritzeFormControl;
  // Null
  nullType?: NullTypeFormControl;
  // Ramsch
  ramschPoints?: RamschPointsFormControl;
  // Misc
  won?: WonFormControl;
}> {
  constructor(
    private store$: Store,
    private listIdFormControl: ListIdFormControl,
    private playerIndexFormControl: PlayerIndexFormControl,
    private gameTypeFormControl: GameTypeFormControl,
    private addsBockSetFormControl: AddsBockSetControl,
    private spitzenFormControl: SpitzenFormControl,
    private handFormControl: HandFormControl,
    private thresholdFormControl: ThresholdFormControl,
    private thresholdAnnouncedFormControl: ThresholdAnnouncedFormControl,
    private spritzeFormControl: SpritzeFormControl,
    private nullTypeFormControl: NullTypeFormControl,
    private ramschPointsFormControl: RamschPointsFormControl,
    private wonFormControl: WonFormControl
  ) {
    super({
      listId: listIdFormControl,
      playerIndex: playerIndexFormControl,
      gameType: gameTypeFormControl,
      addsBockSet: addsBockSetFormControl,
      spitzen: spitzenFormControl,
      hand: handFormControl,
      threshold: thresholdFormControl,
      thresholdAnnounced: thresholdAnnouncedFormControl,
      spritze: spritzeFormControl,
      nullType: nullTypeFormControl,
      ramschPoints: ramschPointsFormControl,
      won: wonFormControl,
    });
  }

  private get effectAware$(): Observable<SkatGameFormGroup> {
    return createEffectAwareForm(this, [
      this.listIdFormControl.formEffect(),
      this.playerIndexFormControl.formEffect(),
      this.gameTypeFormControl.formEffect(),
      this.addsBockSetFormControl.formEffect(),
      this.spitzenFormControl.formEffect(),
      this.handFormControl.formEffect(),
      this.thresholdFormControl.formEffect(),
      this.thresholdAnnouncedFormControl.formEffect(),
      this.spritzeFormControl.formEffect(),
      this.nullTypeFormControl.formEffect(),
      this.ramschPointsFormControl.formEffect(),
      this.wonFormControl.formEffect(),
    ]);
  }

  public forList$(listId: string): Observable<SkatGameFormGroup> {
    this.patchValue({ listId });
    return this.effectAware$;
  }

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
}
