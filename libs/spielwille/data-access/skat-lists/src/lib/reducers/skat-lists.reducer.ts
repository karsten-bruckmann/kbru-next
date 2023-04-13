import { createReducer } from '@ngrx/store';

import { SkatListsState } from '../schemas/skat-lists-state.schema';
import { skatListsInitialState } from '../skat-lists.initial-state';

export const skatListsReducer = createReducer<SkatListsState>(
  skatListsInitialState
);
