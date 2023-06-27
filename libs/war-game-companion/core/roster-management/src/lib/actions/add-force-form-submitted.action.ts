import { createAction, props } from '@ngrx/store';

export const addForceFormSubmitted = createAction(
  'roster-management/add-force-form-submitted',
  props<{
    value: {
      rosterId: string;
      forceId: string;
    };
  }>()
);
