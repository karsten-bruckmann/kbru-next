import { createReducer } from '@ngrx/store';

import { groupsInitialState } from '../groups.initial-state';
import { GroupsState } from '../schemas/groups-state.schema';

export const groupsReducer = createReducer<GroupsState>(groupsInitialState);
