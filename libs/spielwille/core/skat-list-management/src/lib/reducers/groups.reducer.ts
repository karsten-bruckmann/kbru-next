import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { GroupsState } from '@kbru/spielwille/data-access/groups';
import { on } from '@ngrx/store';

import { listStadardDeletedAction } from '../actions/list-standard-deleted.action';
import { listStandardSavedAction } from '../actions/list-standard-saved.action';
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
  ),
  on(listStandardSavedAction, (state, action): GroupsState => {
    const standards = { ...state[action.groupId].standards };
    delete standards[action.name];
    return {
      ...state,
      [action.groupId]: {
        ...state[action.groupId],
        standards: {
          ...state[action.groupId].standards,
          [action.name]: action.rules,
        },
      },
    };
  }),
  on(listStadardDeletedAction, (state, action): GroupsState => {
    const standards = { ...state[action.groupId].standards };
    delete standards[action.name];
    return {
      ...state,
      [action.groupId]: {
        ...state[action.groupId],
        standards,
      },
    };
  })
);
