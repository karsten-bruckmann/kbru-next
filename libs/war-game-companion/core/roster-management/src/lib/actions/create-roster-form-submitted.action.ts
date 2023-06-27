import { createAction, props } from '@ngrx/store';

export const createRosterFormSubmitted = createAction(
  'roster-management/create-roster-form-submitted',
  props<{
    value: {
      name: string;
      gameSystemId: string;
      catalogueId: string;
      forceId: string;
    };
  }>()
);
