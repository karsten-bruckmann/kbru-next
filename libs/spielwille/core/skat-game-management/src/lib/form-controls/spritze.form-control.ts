import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { toVoid } from '@kbru/shared/utils/rxjs-utils';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  firstValueFrom,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { GameType } from '../models/game-type.model';
import { List } from '../models/list.model';
import { Spritze } from '../models/spritze.model';
import { getStandardGameTypes } from '../rules/get-standard-game-types.rule';
import { getPossibleSpritzen } from '../rules/possible-control-values/get-possible-spritzen.rule';
import { listSelector } from '../selectors/list.selector';

@Injectable({ providedIn: 'root' })
export class SpritzeFormControl extends FormControl<Spritze> {
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

          if (!getPossibleSpritzen(list).includes(control.value)) {
            return { invalid: true };
          }
          return null;
        },
      ],
    });
  }

  public possibleValues: Spritze[] = [];

  public static getValidator(list: List): ValidatorFn {
    return (control) => {
      if (!getPossibleSpritzen(list).includes(control.value)) {
        return { invalid: true };
      }
      return null;
    };
  }

  public formEffect(): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return combineLatest([
        form.controls.gameType.valueChanges.pipe(
          startWith(form.controls.gameType.value)
        ),
        form.controls.listId.valueChanges.pipe(
          startWith(form.controls.listId.value),
          switchMap((listId) =>
            listId ? this.store$.select(listSelector(listId)) : of(null)
          )
        ),
      ]).pipe(
        tap(([gameType, list]) => {
          if (!list) {
            return;
          }
          const types: (GameType | null)[] = getStandardGameTypes();
          if (types.includes(gameType) && !form.controls.spritze) {
            form.addControl('spritze', this);
          }
          if (!types.includes(gameType) && form.controls.spritze) {
            form.removeControl('spritze');
          }
          if (form.controls.spritze) {
            form.controls.spritze.possibleValues = getPossibleSpritzen(list);
          }
        }),
        toVoid()
      );
    };
  }

  public getPlayerName: (index: number) => string = () => '';
}
