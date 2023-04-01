import { createAction, props } from '@ngrx/store';

import { groupManagementName } from '../group-management.name';
import { PlayerForm } from '../models/player-form.model';

export const addPlayerFormSubmittedAction = createAction(
  `${groupManagementName}/add-player-form-submitted`,
  props<{ value: PlayerForm['value'] }>()
);
