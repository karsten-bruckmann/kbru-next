import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import { Store } from '@ngrx/store';
import { firstValueFrom, map, startWith, switchMap } from 'rxjs';

import { SkatListFormGroup } from '../form-groups/skat-list.form-group';
import { groupPlayersSelector } from '../selectors/group-players.selector';

@Injectable({ providedIn: 'root' })
export class PlayerIdsFormControl extends FormControl<string[] | null> {
  constructor(private store$: Store) {
    super(null, {
      asyncValidators: [
        async (control) => {
          if (!(control.parent instanceof SkatListFormGroup)) {
            return { parent: true };
          }

          if (
            !control.parent.controls.groupId ||
            !control.parent.controls.groupId.value
          ) {
            return { groupId: true };
          }

          if (!Array.isArray(control.value)) {
            return { type: true };
          }

          if (control.value.length > 5 || control.value.length < 3) {
            return { amount: true };
          }

          const groupPlayerIds = (
            await firstValueFrom(
              this.store$.select(
                groupPlayersSelector(control.parent.controls.groupId.value)
              )
            )
          ).map((p) => p.id);

          if (
            control.value.find((playerId) => !groupPlayerIds.includes(playerId))
          ) {
            return { invalidId: true };
          }

          return null;
        },
      ],
    });
  }

  public possibleValues: string[] = [];

  public formEffect(): FormEffect<SkatListFormGroup> {
    return (form) => {
      return form.controls.groupId.valueChanges.pipe(
        startWith(form.controls.groupId.value),
        filterNullish(),
        switchMap((groupId) =>
          this.store$.select(groupPlayersSelector(groupId))
        ),
        map((players) => {
          form.controls.playerIds.possibleValues = players
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((player) => player.id);
          form.controls.playerIds.getPlayerName = (id) =>
            players.find((player) => player.id === id)?.name ||
            '[Unbekannter Spieler]';
        })
      );
    };
  }

  public getPlayerName: (id: string) => string = () => '';
}
