import { createReducer } from '@ngrx/store';

import { SkatListsState } from '../models/skat-lists-state.model';
import { skatListsInitialState } from '../skat-lists.initial-state';

export const skatListsReducer = createReducer<SkatListsState>(
  skatListsInitialState
);
