import { FormEffect } from '@kbru/shared/utils/effect-aware-forms';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import { Store } from '@ngrx/store';
import { map, startWith, switchMap } from 'rxjs';

import { SkatListForm } from '../models/skat-list-form.model';
import { playersSelector } from '../selectors/players.selector';

export const updateAvailablePlayersFormEffect =
  (store$: Store): FormEffect<SkatListForm> =>
  (form) => {
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
