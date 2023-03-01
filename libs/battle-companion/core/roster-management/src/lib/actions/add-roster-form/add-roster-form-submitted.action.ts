import { createAction, props } from '@ngrx/store';

export const addRosterFormSubmitted = createAction(
  'roster-management/add-roster-form-submitted',
  props<{ file: File }>()
);
