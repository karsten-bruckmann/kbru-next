import { SkatList } from '@kbru/spielwille/data-access/skat-lists';
import { createAction, props } from '@ngrx/store';

export const listStandardSavedAction = createAction(
  'skat-list-management/list-standard-saved',
  props<{
    groupId: string;
    rules: SkatList['rules'];
    name: string;
  }>()
);
