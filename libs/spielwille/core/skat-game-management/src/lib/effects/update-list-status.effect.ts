import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { skatGameFormSubmittedAction } from '../actions/skat-game-form-submitted.action';
import { skatListStatusUpdatedAction } from '../actions/skat-list-status-updated.action';
import { FixedSet } from '../models/fixed-set.model';
import { getPlayerPositions } from '../rules/get-player-positions.rule';
import { getPossibleGameTypes } from '../rules/get-possible-game-types.rule';
import { listSelector } from '../selectors/list.selector';

@Injectable()
export class UpdateListStatusEffect {
  constructor(private store$: Store, private actions$: Actions) {}

  public effect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(skatGameFormSubmittedAction),
      concatLatestFrom((action) =>
        this.store$.select(listSelector(action.listId))
      ),
      map(([action, list]) => {
        if (!list) {
          throw new Error();
        }

        const numPlayers = list.playerNames.length;

        const fixedSets: FixedSet[] = list.status
          ? [...list.status.fixedSets]
          : [];

        if (fixedSets[0]) {
          fixedSets[0] = {
            ...fixedSets[0],
            remainingGames: fixedSets[0].remainingGames - 1,
          };
          if (fixedSets[0].remainingGames === 0) {
            fixedSets.shift();
          }
        }

        if (action.game.addsBockSet) {
          fixedSets.push({
            type: 'bock',
            remainingGames: numPlayers,
          });
          if (list.rules.ramsch) {
            fixedSets.push({
              type: 'ramsch',
              remainingGames: numPlayers,
            });
          }
        }

        return skatListStatusUpdatedAction({
          listId: action.listId,
          status: {
            availableGameTypes: getPossibleGameTypes(
              list.rules.addOn,
              list.rules.ramsch !== false,
              numPlayers,
              list.games
            ),
            playerPositions: getPlayerPositions(
              list.playerNames.length,
              list.games.length
            ),
            fixedSets,
          },
        });
      })
    )
  );
}
