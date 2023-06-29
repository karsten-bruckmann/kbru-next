import { createSelector } from '@ngrx/store';

import { gameDefinitionDataSelector } from './game-definition-data.selector';

export const repositoryNameSelector = createSelector(
  gameDefinitionDataSelector,
  (state): string | null => {
    return state?.repositoryName ?? null;
  }
);
