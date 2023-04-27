import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import {
  combineLatest,
  map,
  Observable,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game-type.model';
import { List } from '../models/list.model';
import { Threshold } from '../models/threshold.model';
import { getStandardGameTypes } from '../rules/get-standard-game-types.rule';
import { getPossibleThresholdAnnouncements } from '../rules/possible-control-values/get-possible-threshold-announcements.rule';

export class ThresholdAnnouncedFormControl extends FormControl<Threshold> {
  constructor() {
    super(null);
  }

  public possibleValues: Threshold[] = [];

  public formEffect(
    list$: Observable<List | null>
  ): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return combineLatest([
        form.controls.gameType.valueChanges.pipe(
          startWith(form.controls.gameType.value)
        ),
        list$,
      ]).pipe(
        switchMap(([gameType, list]) => {
          const types: (GameType | null)[] = getStandardGameTypes();
          let control = form.controls.thresholdAnnounced;
          if (!types.includes(gameType)) {
            if (control) {
              form.removeControl('thresholdAnnounced');
              control = undefined;
            }
          } else {
            if (!control) {
              form.addControl('thresholdAnnounced', this);
              control = form.controls.thresholdAnnounced;
              if (control) {
                control.possibleValues = getPossibleThresholdAnnouncements();
              }
            }
          }
          return form.valueChanges.pipe(
            map((value) => value.hand),
            startWith(form.controls.hand?.value || false),
            map((hand) => !!hand),
            tap((hand) => {
              if (
                !hand &&
                !list?.rules.thresholdAnnouncementWithoutHand &&
                control &&
                control.enabled
              ) {
                control.disable();
                control.setValue(null);
              }
              if (
                (hand || list?.rules.thresholdAnnouncementWithoutHand) &&
                control &&
                control.disabled
              ) {
                control.enable();
              }
            })
          );
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
