import { createAction, props } from '@ngrx/store';

import { GroupsResponse } from '../api-clients/groups.api-client';
import { groupsSlice } from '../groups.slice';

export const groupsLoaded = createAction(
  `${groupsSlice}/loaded`,
  props<{ groups: GroupsResponse }>()
);
