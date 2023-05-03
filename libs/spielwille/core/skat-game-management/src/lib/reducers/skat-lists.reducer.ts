import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { SkatListsState } from '@kbru/spielwille/data-access/skat-lists';
import { on } from '@ngrx/store';

import { skatGameFormSubmittedAction } from '../actions/skat-game-form-submitted.action';

export const skatListsReducer = createCoreReducer<SkatListsState>(
  on(skatGameFormSubmittedAction, (state, action) => {
    return {
      ...state,
      [action.listId]: {
        ...state[action.listId],
        gameIds: [...state[action.listId].gameIds, action.game.id],
        points: [...state[action.listId].points].map(
          (p, i) => p + action.game.result[i]
        ),
      },
    };
  })
);
