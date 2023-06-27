import { createFeatureSelector } from '@ngrx/store';

import { RostersState } from '../models/rosters-state.model';

export const rostersFeatureSelector =
  createFeatureSelector<RostersState>('rosters');
