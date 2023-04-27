import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game-type.model';

export class RamschPointsFormControl extends FormControl<number | null> {
  constructor() {
    super(null);
  }

  public readonly min = 40;
  public readonly max = 120;

  public formEffect(): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return form.controls.gameType.valueChanges.pipe(
        startWith(form.controls.gameType.value),
        tap((gameType) => {
          const types: (GameType | null)[] = ['ramsch'];
          if (types.includes(gameType) && !form.controls.ramschPoints) {
            form.addControl('ramschPoints', this);
          }
          if (!types.includes(gameType) && form.controls.ramschPoints) {
            form.removeControl('ramschPoints');
          }
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
