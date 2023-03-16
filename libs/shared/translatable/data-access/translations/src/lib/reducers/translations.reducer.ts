import { createReducer } from '@ngrx/store';

import { TranslationsState } from '../models/translations-state.model';
import { translationsInitialState } from '../translations.initial-state';

export const translationsReducer = createReducer<TranslationsState>(
  translationsInitialState
);
