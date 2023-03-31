import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { GroupsState } from '@kbru/skat-list/data-access/groups';
import { on } from '@ngrx/store';
import { v4 as uuid } from 'uuid';

import { addFormSubmittedAction } from '../actions/add-form-submitted.action';
import { groupDeletedAction } from '../actions/group-deleted.action';

export const groupsReducer = createCoreReducer<GroupsState>(
  on(
    addFormSubmittedAction,
    (state, action): GroupsState => ({
      ...state,
      [uuid()]: {
        name: action.value.groupName || '',
      },
    })
  ),
  on(groupDeletedAction, (state, action): GroupsState => {
    const next = { ...state };
    delete next[action.id];
    return next;
  })
);
