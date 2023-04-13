import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { SkatListsState } from '@kbru/spielwille/data-access/skat-lists';
import { on } from '@ngrx/store';

import { skatGameFormSubmittedAction } from '../actions/skat-game-form-submitted.action';
import { updateStatus } from '../rules/update-status.rule';

export const skatListsReducer = createCoreReducer<SkatListsState>(
  on(skatGameFormSubmittedAction, (state, action) => ({
    ...state,
    [action.listId]: {
      ...state[action.listId],
      gameIds: [...state[action.listId].gameIds, action.game.id],
      status: updateStatus(state[action.listId], action.game),
    },
  }))
);
