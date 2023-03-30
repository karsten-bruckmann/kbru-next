import { createReducer } from '@ngrx/store';

import { GroupsState } from '../models/groups-state.model';
import { groupsInitialState } from '../groups.initial-state';

export const groupsReducer = createReducer<GroupsState>(groupsInitialState);
