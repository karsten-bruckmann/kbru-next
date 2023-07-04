import { Force } from '@kbru/war-game-companion/data-access/rosters';
import { createAction, props } from '@ngrx/store';

export const addForceFormSubmitted = createAction(
  'roster-management/add-force-form-submitted',
  props<{
    rosterId: string;
    catalogueId: string;
    value: {
      force: Force;
    };
  }>()
);
