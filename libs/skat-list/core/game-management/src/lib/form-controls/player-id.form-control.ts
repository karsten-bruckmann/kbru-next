import { AsyncValidatorFn, FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import { Store } from '@ngrx/store';
import { firstValueFrom, map, startWith, switchMap } from 'rxjs';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { playersSelector } from '../selectors/players.selector';

export class PlayerIdFormControl extends FormControl<string | null> {
  public possibleValues: string[] = [];

  public static getAsyncValidator(
    listId: string,
    store$: Store
  ): AsyncValidatorFn {
    return async (control) => {
      if (typeof control.value !== 'string') {
        return { type: true };
      }

      const listPlayerIds = (
        await firstValueFrom(store$.select(playersSelector(listId)))
      ).map((player) => player.id);

      if (!listPlayerIds.includes(control.value)) {
        return { invalidId: true };
      }

      return null;
    };
  }

  public static formEffect(store$: Store): FormEffect<SkatGameFormGroup> {
    return (form) => {
      return form.controls.listId.valueChanges.pipe(
        startWith(form.controls.listId.value),
        filterNullish(),
        switchMap((listId) => store$.select(playersSelector(listId))),
        map((players) => {
          form.controls.playerId.possibleValues = players.map(
            (player) => player.id
          );
          form.controls.playerId.getPlayerName = (id) =>
            players.find((player) => player.id === id)?.name ||
            '[Unbekannter Spieler]';
        })
      );
    };
  }

  public getPlayerName: (id: string) => string = () => '';
}
