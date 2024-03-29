import { RostersState } from '@kbru/battle-companion/data-access/rosters';
import { toRecord } from '@kbru/shared/utils/array-utils';
import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { on } from '@ngrx/store';

import { rosterDeleted } from '../actions/roster-deleted.action';
import { rosterParsed } from '../actions/roster-parsed.action';

export const rostersReducer = createCoreReducer<RostersState>(
  on(rosterParsed, (state, action) => ({
    ...state,
    rosters: {
      ...state.rosters,
      [action.roster.id]: {
        ...action.roster,
        detachments: action.roster.detachments.map((detachment) => ({
          ...detachment,
          units: detachment.units.map((unit) => unit.id),
        })),
      },
    },
    units: {
      ...state.units,
      ...toRecord(
        action.roster.detachments.map((detachment) => detachment.units).flat()
      ),
    },
  })),
  on(rosterDeleted, (state, action) => {
    const next: RostersState = { ...state, rosters: { ...state.rosters } };
    delete next.rosters[action.id];
    return next;
  })
);
