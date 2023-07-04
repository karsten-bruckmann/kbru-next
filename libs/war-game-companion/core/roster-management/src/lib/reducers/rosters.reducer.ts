import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { RostersState } from '@kbru/war-game-companion/data-access/rosters';
import { on } from '@ngrx/store';
import { v4 as uuid } from 'uuid';

import { addForceFormSubmitted } from '../actions/add-force-form-submitted.action';
import { addSelectionEntryFormSubmitted } from '../actions/add-selection-entry-form-submitted.action';
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
              selections: [],
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
          forces: [
            ...roster.forces,
            { id: action.value.forceId, selections: [] },
          ],
        },
      ],
    };
  }),
  on(addSelectionEntryFormSubmitted, (state, action): RostersState => {
    const roster = state[action.roster.catalogueId]?.find(
      (r) => r.id === action.roster.id
    );
    if (!roster) {
      return state;
    }

    return {
      ...state,
      [roster.catalogueId]: [
        ...(state[roster.catalogueId] ?? []).filter((r) => r.id !== roster.id),
        {
          ...roster,
          forces: roster.forces.map((f, i) => {
            if (i !== action.forceIndex) {
              return f;
            }

            return {
              ...f,
              selections: [...f.selections, action.value.selectionReference],
            };
          }),
        },
      ],
    };
  })
);
