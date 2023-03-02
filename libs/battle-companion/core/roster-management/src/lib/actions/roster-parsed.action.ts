import { Roster } from '@kbru/battle-companion/data-access/rosters';
import { createAction, props } from '@ngrx/store';

export const rosterParsed = createAction(
  'roster-management/roster-parsed',
  props<{ roster: Roster }>()
);
