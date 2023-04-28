import { createAction, props } from '@ngrx/store';

import { Status } from '../models/status.model';

export const skatListStatusUpdatedAction = createAction(
  'skat-game-management/skat-list-status-updated',
  props<{ listId: string; status: Status }>()
);
