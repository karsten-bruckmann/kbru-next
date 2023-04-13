import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType, Threshold } from '../models/game.model';

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

  public static formEffect(): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return form.controls.gameType.valueChanges.pipe(
        startWith(form.controls.gameType.value),
        tap((gameType) => {
          const types: (GameType | null)[] = [
            'diamonds',
            'hearts',
            'spades',
            'clubs',
            'grand',
          ];
          if (types.includes(gameType) && !form.controls.thresholdAnnounced) {
            form.addControl(
              'thresholdAnnounced',
              new ThresholdAnnouncedFormControl(
                null,
                ThresholdAnnouncedFormControl.validator
              )
            );
          }
          if (!types.includes(gameType) && form.controls.thresholdAnnounced) {
            form.removeControl('thresholdAnnounced');
          }
          if (form.controls.thresholdAnnounced) {
            form.controls.thresholdAnnounced.possibleValues = [
              null,
              'schneider',
              'schwarz',
            ];
          }
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
