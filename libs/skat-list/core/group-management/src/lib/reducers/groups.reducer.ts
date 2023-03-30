import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { GroupsState } from '@kbru/skat-list/data-access/groups';
import { on } from '@ngrx/store';
import { v4 as uuid } from 'uuid';

import { addFormSubmittedAction } from '../actions/add-form-submitted.action';

export const groupsReducer = createCoreReducer<GroupsState>(
  on(addFormSubmittedAction, (state, action) => ({
    ...state,
    [uuid()]: {
      name: action.value.groupName || '',
    },
  }))
);
