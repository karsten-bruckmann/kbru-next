import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { combineLatest, Observable, startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { List } from '../models/list.model';
import { Spritze } from '../models/spritze.model';
import { getPossibleSpritzen } from '../rules/possible-control-values/get-possible-spritzen.rule';

export class SpritzeFormControl extends FormControl<Spritze> {
  constructor() {
    super(null);
  }

  public possibleValues: Spritze[] = [];

  public formEffect(
    list$: Observable<List | null>
  ): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return combineLatest([
        list$,
        form.controls.gameType.valueChanges.pipe(
          startWith(form.controls.gameType.value)
        ),
      ]).pipe(
        tap(([list, gameType]) => {
          const addField = true;
          if (
            list === null ||
            gameType === null ||
            getPossibleSpritzen(list, gameType).filter((v) => !!v).length === 0
          ) {
            form.removeControl('spritze');
            this.possibleValues = [];
          } else {
            if (addField && !form.controls.spritze) {
              form.addControl('spritze', this);
              this.possibleValues = getPossibleSpritzen(list, gameType);
            }
          }
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
