import { unitSelector as unitBaseSelector } from '@kbru/battle-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { Unit } from '../models/unit.model';

export const unitSelector = (unitId: string) =>
  createSelector(
    unitBaseSelector(unitId),
    (unit): Unit => ({
      ...unit,
      id: unitId,
    })
  );
