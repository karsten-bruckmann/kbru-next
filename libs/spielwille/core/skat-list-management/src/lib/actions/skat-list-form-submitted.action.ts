import { SkatList } from '@kbru/spielwille/data-access/skat-lists';
import { createAction, props } from '@ngrx/store';

export const skatListFormSubmittedAction = createAction(
  'skat-list-management/skat-list-form-submitted',
  props<{ skatList: SkatList; uuid: string; groupId: string }>()
);
