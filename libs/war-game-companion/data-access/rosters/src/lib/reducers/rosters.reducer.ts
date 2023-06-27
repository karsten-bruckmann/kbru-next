import { createReducer } from '@ngrx/store';

import { RostersState } from '../models/rosters-state.model';
import { rostersInitialState } from '../rosters.initial-state';

export const rostersReducer = createReducer<RostersState>(rostersInitialState);
