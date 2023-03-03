import { rostersSelector } from '@kbru/battle-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { RosterListItem } from '../models/roster-list-item.model';

export const rosterListSelector = createSelector(rostersSelector, (rosters) =>
  Object.entries(rosters).map(
    ([id, roster]): RosterListItem => ({ id, name: roster.title })
  )
);
