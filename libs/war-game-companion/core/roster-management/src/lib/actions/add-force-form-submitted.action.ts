import { createAction, props } from '@ngrx/store';

export const addForceFormSubmitted = createAction(
  'roster-management/add-force-form-submitted',
  props<{
    repositoryName: string;
    value: {
      rosterId: string;
      catalogueId: string;
      forceId: string;
    };
  }>()
);
