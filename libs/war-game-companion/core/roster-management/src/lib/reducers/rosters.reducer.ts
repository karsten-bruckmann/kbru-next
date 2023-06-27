import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { RostersState } from '@kbru/war-game-companion/data-access/rosters';
import { on } from '@ngrx/store';
import { v4 as uuid } from 'uuid';

import { addForceFormSubmitted } from '../actions/add-force-form-submitted.action';
import { createRosterFormSubmitted } from '../actions/create-roster-form-submitted.action';

export const rostersReducer = createCoreReducer<RostersState>(
  on(
    createRosterFormSubmitted,
    (state, action): RostersState => [
      ...state,
      {
        id: uuid(),
        name: action.value.name,
        gameSystemId: action.value.gameSystemId,
        catalogueId: action.value.catalogueId,
        forceIds: [action.value.forceId],
      },
    ]
  ),
  on(addForceFormSubmitted, (state, action): RostersState => {
    const roster = state.find((r) => r.id === action.value.rosterId);
    if (!roster) {
      return state;
    }

    return [
      ...state.filter((r) => r.id !== roster.id),
      {
        ...roster,
        forceIds: [...roster.forceIds, action.value.forceId],
      },
    ];
  })
);
