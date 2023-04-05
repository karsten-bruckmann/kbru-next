import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { GroupsState } from '@kbru/skat-list/data-access/groups';
import { on } from '@ngrx/store';

import { skatListFormSubmittedAction } from '../actions/skat-list-form-submitted.action';

export const groupsReducer = createCoreReducer<GroupsState>(
  on(
    skatListFormSubmittedAction,
    (state, action): GroupsState => ({
      ...state,
      [action.groupId]: {
        ...state[action.groupId],
        listIds: [...state[action.groupId].listIds, action.uuid],
      },
    })
  )
);
