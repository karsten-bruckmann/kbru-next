import { createAction, props } from '@ngrx/store';

import { ListStatus } from '../models/list-status.model';

export const skatListStatusUpdatedAction = createAction(
  'skat-game-management/skat-list-status-updated',
  props<{ listId: string; status: ListStatus }>()
);
