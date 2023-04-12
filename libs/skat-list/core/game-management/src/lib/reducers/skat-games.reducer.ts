import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import {
  skatGameSchema,
  SkatGamesState,
} from '@kbru/skat-list/data-access/skat-games';
import { on } from '@ngrx/store';

import { skatGameFormSubmittedAction } from '../actions/skat-game-form-submitted.action';

export const skatGamesReducer = createCoreReducer<SkatGamesState>(
  on(skatGameFormSubmittedAction, (state, action): SkatGamesState => {
    return {
      ...state,
      [action.game.id]: skatGameSchema.parse(action.game),
    };
  })
);
