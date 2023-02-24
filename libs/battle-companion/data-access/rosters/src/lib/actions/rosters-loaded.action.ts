import { createAction, props } from '@ngrx/store';

import { RostersResponse } from '../api-clients/rosters.api-client';
import { rostersSlice } from '../rosters.slice';

export const rostersLoaded = createAction(
  `${rostersSlice}/loaded`,
  props<{ rosters: RostersResponse }>()
);
