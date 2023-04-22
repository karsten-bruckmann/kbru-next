import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { Store } from '@ngrx/store';
import { firstValueFrom, of, startWith, switchMap, tap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game-type.model';
import { getPossibleGameTypes } from '../rules/possible-control-values/get-possible-game-types.rule';
import { listSelector } from '../selectors/list.selector';

@Injectable({ providedIn: 'root' })
export class GameTypeFormControl extends FormControl<GameType | null> {
  constructor(private store$: Store) {
    super(null, {
      asyncValidators: [
        async (control) => {
          if (!(control.parent instanceof SkatGameFormGroup)) {
            return { parent: true };
          }

          if (!control.parent.controls.listId.value) {
            return { listId: true };
          }

          const list = await firstValueFrom(
            this.store$.select(
              listSelector(control.parent.controls.listId.value)
            )
          );

          if (!list) {
            return { list: true };
          }

          if (!getPossibleGameTypes(list).includes(control.value)) {
            return { invalid: true };
          }
          return null;
        },
      ],
    });
  }

  public possibleValues: GameType[] = [];

  public getPlayerName: (index: number) => string = () => '';

  public formEffect(): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return form.controls.listId.valueChanges.pipe(
        startWith(form.controls.listId.value),
        switchMap((listId) =>
          listId ? this.store$.select(listSelector(listId)) : of(null)
        ),
        tap((list) => {
          form.controls.gameType.possibleValues = list
            ? getPossibleGameTypes(list)
            : [];
        }),
        toVoid()
      );
    };
  }
}
