import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game-type.model';
import { Threshold } from '../models/threshold.model';
import { getStandardGameTypes } from '../rules/get-standard-game-types.rule';
import { getPossibleThresholds } from '../rules/possible-control-values/get-possible-thresholds.rule';

@Injectable({ providedIn: 'root' })
export class ThresholdFormControl extends FormControl<Threshold> {
  constructor() {
    super(null, (control) => {
      if (![null, 'schneider', 'schwarz'].includes(control.value)) {
        return { invalid: true };
      }
      return null;
    });
  }

  public possibleValues: Threshold[] = [];

  public formEffect(): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return form.controls.gameType.valueChanges.pipe(
        startWith(form.controls.gameType.value),
        tap((gameType) => {
          const types: (GameType | null)[] = getStandardGameTypes();
          if (types.includes(gameType) && !form.controls.threshold) {
            form.addControl('threshold', this);
          }
          if (!types.includes(gameType) && form.controls.threshold) {
            form.removeControl('threshold');
          }
          if (form.controls.threshold) {
            form.controls.threshold.possibleValues = getPossibleThresholds();
          }
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
