import { Inject, Injectable, InjectionToken } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { createEffectAwareForm } from '@kbru/shared/utils/effect-aware-forms';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable, switchMap } from 'rxjs';

import { skatGameFormSubmittedAction } from '../actions/skat-game-form-submitted.action';
import { AddsBockSetControl } from '../form-controls/adds-bock-set.form-control';
import { GameTypeFormControl } from '../form-controls/game-type.form-control';
import { HandFormControl } from '../form-controls/hand.form-control';
import { NullTypeFormControl } from '../form-controls/null-game-type.form-control';
import { PlayerIndexFormControl } from '../form-controls/player-index.form-control';
import { RamschPointsFormControl } from '../form-controls/ramsch-points.form-control';
import { SpitzenFormControl } from '../form-controls/spitzen.form-control';
import { SpritzeFormControl } from '../form-controls/spritze.form-control';
import { ThresholdFormControl } from '../form-controls/threshold.form-control';
import { ThresholdAnnouncedFormControl } from '../form-controls/threshold-announced.form-control';
import { WonFormControl } from '../form-controls/won.form-control';
import { List } from '../models/list.model';
import { getGameFromFormGroup } from '../rules/get-game-from-form-group.rule';
import { listSelector } from '../selectors/list.selector';

export const LIST_ID$ = new InjectionToken<Observable<string>>('LIST_ID$');

@Injectable()
export class SkatGameFormGroup extends FormGroup<{
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
  private list$: Observable<List | null>;
  private playerIndexFormControl: PlayerIndexFormControl;
  private gameTypeFormControl: GameTypeFormControl;
  private addsBockSetFormControl: AddsBockSetControl;
  private spitzenFormControl: SpitzenFormControl;
  private handFormControl: HandFormControl;
  private thresholdFormControl: ThresholdFormControl;
  private thresholdAnnouncedFormControl: ThresholdAnnouncedFormControl;
  private spritzeFormControl: SpritzeFormControl;
  private nullTypeFormControl: NullTypeFormControl;
  private ramschPointsFormControl: RamschPointsFormControl;
  private wonFormControl: WonFormControl;

  constructor(
    @Inject(LIST_ID$) listId$: Observable<string>,
    private store$: Store
  ) {
    const playerIndexFormControl = new PlayerIndexFormControl();
    const gameTypeFormControl = new GameTypeFormControl();
    const addsBockSetFormControl = new AddsBockSetControl();
    const spitzenFormControl = new SpitzenFormControl();
    const handFormControl = new HandFormControl();
    const thresholdFormControl = new ThresholdFormControl();
    const thresholdAnnouncedFormControl = new ThresholdAnnouncedFormControl();
    const spritzeFormControl = new SpritzeFormControl();
    const nullTypeFormControl = new NullTypeFormControl();
    const ramschPointsFormControl = new RamschPointsFormControl();
    const wonFormControl = new WonFormControl();

    super(
      {
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
      },
      (group) => {
        try {
          if (!(group instanceof SkatGameFormGroup)) {
            return { invalidFormType: true };
          }
          getGameFromFormGroup(group);
        } catch (e: unknown) {
          return { invalid: e instanceof Error ? e.message : e };
        }
        return null;
      }
    );

    this.playerIndexFormControl = playerIndexFormControl;
    this.gameTypeFormControl = gameTypeFormControl;
    this.addsBockSetFormControl = addsBockSetFormControl;
    this.spitzenFormControl = spitzenFormControl;
    this.handFormControl = handFormControl;
    this.thresholdFormControl = thresholdFormControl;
    this.thresholdAnnouncedFormControl = thresholdAnnouncedFormControl;
    this.spritzeFormControl = spritzeFormControl;
    this.nullTypeFormControl = nullTypeFormControl;
    this.ramschPointsFormControl = ramschPointsFormControl;
    this.wonFormControl = wonFormControl;

    this.list$ = listId$.pipe(
      switchMap((listId) => this.store$.select(listSelector(listId)))
    );
  }

  public get effectAware$(): Observable<SkatGameFormGroup> {
    return createEffectAwareForm(this, [
      this.playerIndexFormControl.formEffect(this.list$),
      this.gameTypeFormControl.formEffect(this.list$),
      this.addsBockSetFormControl.formEffect(this.list$),
      this.spitzenFormControl.formEffect(this.list$),
      this.handFormControl.formEffect(this.list$),
      this.thresholdFormControl.formEffect(),
      this.thresholdAnnouncedFormControl.formEffect(this.list$),
      this.spritzeFormControl.formEffect(this.list$),
      this.nullTypeFormControl.formEffect(),
      this.ramschPointsFormControl.formEffect(),
      this.wonFormControl.formEffect(),
    ]);
  }

  public async submit(form: SkatGameFormGroup): Promise<void> {
    if (!form.valid) {
      throw new Error('invalid form');
    }

    const list = await firstValueFrom(this.list$);
    if (!list) {
      throw new Error('no list id');
    }

    const game = getGameFromFormGroup(form);

    this.store$.dispatch(
      skatGameFormSubmittedAction({
        game,
        listId: list.id,
      })
    );
  }
}
