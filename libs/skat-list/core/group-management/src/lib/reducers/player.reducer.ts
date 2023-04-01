import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { PlayersState } from '@kbru/skat-list/data-access/players';
import { on } from '@ngrx/store';

import { addPlayerFormSubmittedAction } from '../actions/add-player-form-submitted.action';

export const playersReducer = createCoreReducer<PlayersState>(
  on(addPlayerFormSubmittedAction, (state, action): PlayersState => {
    if (!action.value.playerId) {
      throw new Error('no playerId');
    }
    return {
      ...state,
      [action.value.playerId]: {
        name: action.value.playerName || '',
      },
    };
  })
);
