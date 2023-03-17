import { createFeatureSelector } from '@ngrx/store';

import { TranslationsState } from '../models/translations-state.model';

export const translationsFeatureSelector =
  createFeatureSelector<TranslationsState>('translations');
