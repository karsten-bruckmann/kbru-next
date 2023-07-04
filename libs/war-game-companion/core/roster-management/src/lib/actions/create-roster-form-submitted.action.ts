import { Force } from '@kbru/war-game-companion/data-access/rosters';
import { createAction, props } from '@ngrx/store';

export const createRosterFormSubmittedAction = createAction(
  'roster-management/create-roster-form-submitted',
  props<{
    catalogueId: string;
    value: {
      name: string;
      force: Force;
    };
  }>()
);
