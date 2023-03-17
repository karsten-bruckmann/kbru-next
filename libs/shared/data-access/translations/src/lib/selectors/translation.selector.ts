import { createSelector } from '@ngrx/store';

import { translationsFeatureSelector } from './translations-feature.selector';

export const translationSelector = (text: string) =>
  createSelector(
    translationsFeatureSelector,
    (state): string => state[text] || text
  );
