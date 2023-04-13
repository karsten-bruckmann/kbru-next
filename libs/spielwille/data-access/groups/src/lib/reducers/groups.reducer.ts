import { createReducer } from '@ngrx/store';

import { groupsInitialState } from '../groups.initial-state';
import { GroupsState } from '../models/groups-state.model';

export const groupsReducer = createReducer<GroupsState>(groupsInitialState);
