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
          name: action.rosterName,
          catalogueId: action.catalogueId,
          forces: [
            {
              id: action.forceId,
            },
          ],
        },
      ],
    })
  ),
  on(addForceFormSubmitted, (state, action): RostersState => {
    const roster = state[action.value.catalogueId]?.find(
      (r) => r.id === action.value.rosterId
    );
    if (!roster) {
      return state;
    }

    return {
      ...state,
      [action.value.catalogueId]: [
        ...(state[action.value.catalogueId] ?? []).filter(
          (r) => r.id !== roster.id
        ),
        {
          ...roster,
          forces: [...roster.forces, { id: action.value.forceId }],
        },
      ],
    };
  })
);
