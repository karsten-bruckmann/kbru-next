import { createSelector } from '@ngrx/store';

import { SkatList } from '../schemas/skat-list.schema';
import { skatListsSelector } from './skat-lists.selector';

export const skatListSelector = (id: string) =>
  createSelector(
    skatListsSelector,
    (state): SkatList | null => state[id] || null
  );
