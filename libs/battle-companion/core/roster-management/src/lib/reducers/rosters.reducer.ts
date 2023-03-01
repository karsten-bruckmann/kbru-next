import { RostersState } from '@kbru/battle-companion/data-access/rosters';
import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { on } from '@ngrx/store';

import { rosterParsed } from '../actions/roster-parsed-unzipped.action';

export const rostersReducer = createCoreReducer<RostersState>(
  on(rosterParsed, (state, action) => ({
    ...state,
    rosters: [...state.rosters, action.roster],
  }))
);
