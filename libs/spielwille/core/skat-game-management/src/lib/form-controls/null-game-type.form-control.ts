import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { startWith, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game-type.model';
import { NullType } from '../models/null-type.model';
import { getPossibleNullTypes } from '../rules/possible-control-values/get-possible-null-types.rule';

@Injectable({ providedIn: 'root' })
export class NullTypeFormControl extends FormControl<NullType | null> {
  constructor() {
    super(null, (control) => {
      if (
        !['einfach', 'hand', 'ouvert', 'hand-ouvert'].includes(control.value)
      ) {
        return { invalid: true };
      }
      return null;
    });
  }

  public possibleValues: NullType[] = [];

  public formEffect(): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return form.controls.gameType.valueChanges.pipe(
        startWith(form.controls.gameType.value),
        tap((gameType) => {
          const types: (GameType | null)[] = ['null'];
          if (types.includes(gameType) && !form.controls.nullType) {
            form.addControl('nullType', this);
          }
          if (!types.includes(gameType) && form.controls.nullType) {
            form.removeControl('nullType');
          }
          if (form.controls.nullType) {
            form.controls.nullType.possibleValues = getPossibleNullTypes();
          }
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
