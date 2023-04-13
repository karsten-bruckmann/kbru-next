import { createAction, props } from '@ngrx/store';

import { PlayerFormGroup } from '../form-groups/player.form-group';
import { groupManagementName } from '../group-management.name';

export const addPlayerFormSubmittedAction = createAction(
  `${groupManagementName}/add-player-form-submitted`,
  props<{ value: PlayerFormGroup['value'] }>()
);
