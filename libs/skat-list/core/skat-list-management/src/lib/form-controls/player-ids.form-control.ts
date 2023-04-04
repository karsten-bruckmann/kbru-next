import { AsyncValidatorFn, FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import { Store } from '@ngrx/store';
import { firstValueFrom, map, startWith, switchMap } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { playersSelector } from '../selectors/players.selector';

export class PlayerIdsFormControl extends FormControl<string[] | null> {
  public possibleValues: string[] = [];

  public static getAsyncValidator(
    groupId: string,
    store$: Store
  ): AsyncValidatorFn {
    return async (control) => {
      if (!Array.isArray(control.value)) {
        return { type: true };
      }

      if (control.value.length > 5 || control.value.length < 3) {
        return { amount: true };
      }

      const groupPlayerIds = (
        await firstValueFrom(store$.select(playersSelector(groupId)))
      ).map((player) => player.id);

      if (
        control.value.find((playerId) => !groupPlayerIds.includes(playerId))
      ) {
        return { invalidId: true };
      }

      return null;
    };
  }

  public static formEffect(store$: Store): FormEffect<SkatListFormGroup> {
    return (form) => {
      return form.controls.groupId.valueChanges.pipe(
        startWith(form.controls.groupId.value),
        filterNullish(),
        switchMap((groupId) => store$.select(playersSelector(groupId))),
        map((players) => {
          form.controls.playerIds.possibleValues = players.map(
            (player) => player.id
          );
          form.controls.playerIds.getPlayerName = (id) =>
            players.find((player) => player.id === id)?.name ||
            '[Unbekannter Spieler]';
        })
      );
    };
  }

  public getPlayerName: (id: string) => string = () => '';
}
