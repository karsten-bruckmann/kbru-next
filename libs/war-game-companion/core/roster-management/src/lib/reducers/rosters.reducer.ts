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
      [action.repositoryName]: [
        ...(state[action.repositoryName] ?? []),
        {
          id: uuid(),
          name: action.rosterName,
          forces: [],
        },
      ],
    })
  ),
  on(addForceFormSubmitted, (state, action): RostersState => {
    const roster = state[action.repositoryName]?.find(
      (r) => r.id === action.value.rosterId
    );
    if (!roster) {
      return state;
    }

    return {
      ...state,
      [action.repositoryName]: [
        ...(state[action.repositoryName] ?? []).filter(
          (r) => r.id !== roster.id
        ),
        {
          ...roster,
          forces: [
            ...roster.forces,
            { id: action.value.forceId, catalogueId: action.value.catalogueId },
          ],
        },
      ],
    };
  })
);
