import { createAction, props } from '@ngrx/store';

import { groupManagementName } from '../group-management.name';
import { GroupForm } from '../models/group-form.model';

export const addGroupFormSubmittedAction = createAction(
  `${groupManagementName}/add-group-form-submitted`,
  props<{ value: GroupForm['value']; created: Date }>()
);
