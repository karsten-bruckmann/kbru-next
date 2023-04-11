import { createAction, props } from '@ngrx/store';

import { GroupFormGroup } from '../form-groups/group.form-group';
import { groupManagementName } from '../group-management.name';

export const addGroupFormSubmittedAction = createAction(
  `${groupManagementName}/add-group-form-submitted`,
  props<{ value: GroupFormGroup['value']; created: Date }>()
);
