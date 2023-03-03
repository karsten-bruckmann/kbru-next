import { createSelector } from '@ngrx/store';

import { unitsSelector } from './units.selector';

export const unitSelector = (id: string) =>
  createSelector(unitsSelector, (units) => units[id]);
