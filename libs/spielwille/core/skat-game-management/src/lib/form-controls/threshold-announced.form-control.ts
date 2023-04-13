import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { map, startWith, switchMap, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType, Threshold } from '../schemas/game.schema';
import { List } from '../schemas/list.schema';

export class ThresholdAnnouncedFormControl extends FormControl<Threshold> {
  public possibleValues: Threshold[] = [];

  public static get validator(): ValidatorFn {
    return (control) => {
      if (![null, 'schneider', 'schwarz'].includes(control.value)) {
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
          const types: (GameType | null)[] = [
            'diamonds',
            'hearts',
            'spades',
            'clubs',
            'grand',
          ];
          if (!types.includes(gameType)) {
            if (form.controls.thresholdAnnounced) {
              form.removeControl('thresholdAnnounced');
            }
          } else {
            if (!form.controls.thresholdAnnounced) {
              form.addControl(
                'thresholdAnnounced',
                new ThresholdAnnouncedFormControl(
                  null,
                  ThresholdAnnouncedFormControl.validator
                )
              );
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              form.controls.thresholdAnnounced!.possibleValues = [
                null,
                'schneider',
                'schwarz',
              ];
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
                form.controls.thresholdAnnounced &&
                form.controls.thresholdAnnounced.enabled
              ) {
                form.controls.thresholdAnnounced.disable();
                form.controls.thresholdAnnounced.setValue(null);
              }
              if (
                (hand || list.rules.thresholdAnnouncementWithoutHand) &&
                form.controls.thresholdAnnounced &&
                form.controls.thresholdAnnounced.disabled
              ) {
                form.controls.thresholdAnnounced.enable();
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
