import { createAction, props } from '@ngrx/store';

import { Roster } from '../models/roster.model';

export const rosterParsed = createAction(
  'roster-management/roster-parsed',
  props<{ roster: Roster }>()
);
