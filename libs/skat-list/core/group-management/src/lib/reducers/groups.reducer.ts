import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { GroupsState } from '@kbru/skat-list/data-access/groups';
import { on } from '@ngrx/store';
import { formatISO } from 'date-fns';

import { addGroupFormSubmittedAction } from '../actions/add-group-form-submitted.action';
import { addPlayerFormSubmittedAction } from '../actions/add-player-form-submitted.action';
import { groupDeletedAction } from '../actions/group-deleted.action';

export const groupsReducer = createCoreReducer<GroupsState>(
  on(addGroupFormSubmittedAction, (state, action): GroupsState => {
    if (!action.value.groupId) {
      throw new Error('no id set');
    }
    return {
      ...state,
      [action.value.groupId]: {
        name: action.value.groupName || '',
        playerIds: [],
        listIds: [],
        created: formatISO(action.created),
      },
    };
  }),
  on(groupDeletedAction, (state, action): GroupsState => {
    const next = { ...state };
    delete next[action.id];
    return next;
  }),
  on(addPlayerFormSubmittedAction, (state, action): GroupsState => {
    const next = { ...state };
    const playerId = action.value.playerId;
    if (!action.value.groupIds || !playerId) {
      return next;
    }
    action.value.groupIds.forEach((groupId) => {
      next[groupId] = {
        ...next[groupId],
        playerIds: [...next[groupId].playerIds, playerId],
      };
    });
    return next;
  })
);
