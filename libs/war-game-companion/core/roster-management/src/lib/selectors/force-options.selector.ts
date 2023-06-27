import {
  catalogueSelector,
  ForceEntry,
  gameSystemSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

export const forceOptions = (gameSystemId: string, categoryId: string) =>
  createSelector(
    gameSystemSelector(gameSystemId),
    catalogueSelector(categoryId),
    (gameSystem, catalogue): { name: string; id: string }[] => {
      const gameSystemForceEntries: ForceEntry[] =
        gameSystem?.forceEntries.forceEntry ?? [];
      const catalogueForceEntries: ForceEntry[] =
        catalogue?.forceEntries?.forceEntry ?? [];

      return [...gameSystemForceEntries, ...catalogueForceEntries].map(
        (force) => ({
          name: force['@_name'],
          id: force['@_id'],
        })
      );
    }
  );
