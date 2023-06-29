import { repositoriesSelector } from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

export const repositoryListSelector = createSelector(
  repositoriesSelector,
  (repositories: string[]) => repositories
);
