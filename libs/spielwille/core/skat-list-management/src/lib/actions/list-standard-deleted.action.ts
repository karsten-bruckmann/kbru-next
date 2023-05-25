import { createAction, props } from '@ngrx/store';

export const listStadardDeletedAction = createAction(
  'skat-list-management/list-standard-deleted',
  props<{
    groupId: string;
    name: string;
  }>()
);
