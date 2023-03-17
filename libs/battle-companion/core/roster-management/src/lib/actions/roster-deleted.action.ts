import { createAction, props } from '@ngrx/store';

export const rosterDeleted = createAction(
  'roster-management/roster-deleted',
  props<{ id: string }>()
);
