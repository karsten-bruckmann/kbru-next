import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { RostersState } from '@kbru/war-game-companion/data-access/rosters';
import { on } from '@ngrx/store';
import { v4 as uuid } from 'uuid';

import { addForceFormSubmitted } from '../actions/add-force-form-submitted.action';
import { createRosterFormSubmittedAction } from '../actions/create-roster-form-submitted.action';

export const rostersReducer = createCoreReducer<RostersState>(
  on(
    createRosterFormSubmittedAction,
    (state, action): RostersState => ({
      ...state,
      [action.catalogueId]: [
        ...(state[action.catalogueId] ?? []),
        {
          id: uuid(),
          name: action.value.name,
          catalogueId: action.catalogueId,
          forces: [
            {
              id: action.value.forceId,
            },
          ],
        },
      ],
    })
  ),
  on(addForceFormSubmitted, (state, action): RostersState => {
    const roster = state[action.catalogueId]?.find(
      (r) => r.id === action.rosterId
    );
    if (!roster) {
      return state;
    }

    return {
      ...state,
      [action.catalogueId]: [
        ...(state[action.catalogueId] ?? []).filter((r) => r.id !== roster.id),
        {
          ...roster,
          forces: [...roster.forces, { id: action.value.forceId }],
        },
      ],
    };
  })
);
