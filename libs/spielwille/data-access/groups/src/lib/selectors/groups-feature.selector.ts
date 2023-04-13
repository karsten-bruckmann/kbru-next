import { createFeatureSelector } from '@ngrx/store';

import { GroupsState } from '../models/groups-state.model';

export const groupsFeatureSelector =
  createFeatureSelector<GroupsState>('groups');
