import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { map, startWith, switchMap, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game-type.model';
import { List } from '../models/list.model';
import { Threshold } from '../models/threshold.model';
import { getStandardGameTypes } from '../rules/get-standard-game-types.rule';
import { getPossibleThresholdAnnouncements } from '../rules/possible-control-values/get-possible-threshold-announcements.rule';

export class ThresholdAnnouncedFormControl extends FormControl<Threshold> {
  public possibleValues: Threshold[] = [];

  public static get validator(): ValidatorFn {
    return (control) => {
      if (!getPossibleThresholdAnnouncements().includes(control.value)) {
        return { invalid: true };
      }
      return null;
    };
  }

  public static formEffect(list: List): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return form.controls.gameType.valueChanges.pipe(
        startWith(form.controls.gameType.value),
        switchMap((gameType) => {
          const types: (GameType | null)[] = getStandardGameTypes();
          let control = form.controls.thresholdAnnounced;
          if (!types.includes(gameType)) {
            if (control) {
              form.removeControl('thresholdAnnounced');
              control = undefined;
            }
          } else {
            if (!control) {
              form.addControl(
                'thresholdAnnounced',
                new ThresholdAnnouncedFormControl(
                  null,
                  ThresholdAnnouncedFormControl.validator
                )
              );
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
                !list.rules.thresholdAnnouncementWithoutHand &&
                control &&
                control.enabled
              ) {
                control.disable();
                control.setValue(null);
              }
              if (
                (hand || list.rules.thresholdAnnouncementWithoutHand) &&
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
