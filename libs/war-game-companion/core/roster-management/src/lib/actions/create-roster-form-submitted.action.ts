import { createAction, props } from '@ngrx/store';

export const createRosterFormSubmittedAction = createAction(
  'roster-management/create-roster-form-submitted',
  props<{
    catalogueId: string;
    rosterName: string;
    forceId: string;
  }>()
);
