import { createSelector } from '@ngrx/store';

import { ForceEntry } from '../schemas/force-entries.schema';
import { cataloguesSelector } from './catalogues.selector';
import { gameSystemsSelector } from './game-systems.selector';

export const forceSelector = (id: string) =>
  createSelector(
    gameSystemsSelector,
    cataloguesSelector,
    (gameSystems, catalogues): ForceEntry | null => {
      return (
        [...Object.values(gameSystems), ...Object.values(catalogues)]
          .map((gs) => gs.forceEntries?.forceEntry)
          .flat()
          .filter((f): f is ForceEntry => !!f)
          .find((f) => f['@_id'] === id) ?? null
      );
    }
  );
