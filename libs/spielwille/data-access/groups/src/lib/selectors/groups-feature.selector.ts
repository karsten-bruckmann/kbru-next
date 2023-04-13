import { createFeatureSelector } from '@ngrx/store';

import { GroupsState } from '../schemas/groups-state.schema';

export const groupsFeatureSelector =
  createFeatureSelector<GroupsState>('groups');
