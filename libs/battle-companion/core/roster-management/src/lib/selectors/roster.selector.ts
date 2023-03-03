import {
  rosterSelector as rosterBaseSelector,
  unitsSelector,
} from '@kbru/battle-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { Roster } from '../models/roster.model';

export const rosterSelector = (id: string) =>
  createSelector(
    rosterBaseSelector(id),
    unitsSelector,
    (roster, units): Roster => ({
      ...roster,
      id,
      detachments: roster.detachments.map((detachment) => ({
        ...detachment,
        units: detachment.units.map((unitId) => ({
          ...units[unitId],
          id: unitId,
        })),
      })),
    })
  );
