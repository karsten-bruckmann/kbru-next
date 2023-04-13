import { createAction, props } from '@ngrx/store';

import { groupManagementName } from '../group-management.name';

export const groupDeletedAction = createAction(
  `${groupManagementName}/group-deleted`,
  props<{ id: string }>()
);
