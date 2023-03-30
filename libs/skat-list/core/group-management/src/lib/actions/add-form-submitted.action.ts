import { createAction, props } from '@ngrx/store';

import { groupManagementName } from '../group-management.name';
import { GroupForm } from '../models/group-form.model';

export const addFormSubmittedAction = createAction(
  `${groupManagementName}/add-form-submitted`,
  props<{ value: GroupForm['value'] }>()
);
