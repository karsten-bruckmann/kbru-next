import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { RostersState } from '@kbru/war-game-companion/data-access/rosters';
import { on } from '@ngrx/store';
import { v4 as uuid } from 'uuid';

import { createRosterFormSubmitted } from '../actions/create-roster-form-submitted.action';

export const rostersReducer = createCoreReducer<RostersState>(
  on(
    createRosterFormSubmitted,
    (state, action): RostersState => [
      ...state,
      {
        id: uuid(),
        name: action.value.name,
        catalogueId: action.value.catalogueId,
        forceIds: [action.value.forceId],
      },
    ]
  )
);
