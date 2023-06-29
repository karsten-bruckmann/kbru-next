import { createSelector } from '@ngrx/store';

import { ForceEntry } from '../schemas/force-entries.schema';
import { cataloguesSelector } from './catalogues.selector';
import { gameSystemSelector } from './game-system.selector';

export const forceSelector = (id: string) =>
  createSelector(
    gameSystemSelector,
    cataloguesSelector,
    (gameSystem, catalogues): ForceEntry | undefined => {
      return [gameSystem, ...Object.values(catalogues || {})]
        .map((gs) => gs?.forceEntries?.forceEntry)
        .flat()
        .filter((f): f is ForceEntry => !!f)
        .find((f) => f['@_id'] === id);
    }
  );
