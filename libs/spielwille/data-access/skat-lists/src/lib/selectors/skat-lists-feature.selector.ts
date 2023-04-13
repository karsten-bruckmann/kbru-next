import { createFeatureSelector } from '@ngrx/store';

import { SkatListsState } from '../schemas/skat-lists-state.schema';

export const skatListsFeatureSelector =
  createFeatureSelector<SkatListsState>('skat-lists');
