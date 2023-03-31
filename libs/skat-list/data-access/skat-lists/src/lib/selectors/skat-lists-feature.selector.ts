import { createFeatureSelector } from '@ngrx/store';

import { SkatListsState } from '../models/skat-lists-state.model';

export const skatListsFeatureSelector =
  createFeatureSelector<SkatListsState>('skat-lists');
