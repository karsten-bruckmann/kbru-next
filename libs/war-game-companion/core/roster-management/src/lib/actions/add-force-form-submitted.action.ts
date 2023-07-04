import { createAction, props } from '@ngrx/store';

export const addForceFormSubmitted = createAction(
  'roster-management/add-force-form-submitted',
  props<{
    rosterId: string;
    catalogueId: string;
    value: {
      forceId: string;
    };
  }>()
);
