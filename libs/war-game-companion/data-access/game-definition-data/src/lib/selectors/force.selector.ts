import { createSelector } from '@ngrx/store';

import { ForceEntry } from '../schemas/force-entries.schema';
import { catalogueSelector } from './catalogue.selector';
import { gameSystemSelector } from './game-system.selector';

export const forceSelector = (id: string) =>
  createSelector(
    gameSystemSelector,
    catalogueSelector,
    (gameSystem, catalogue): ForceEntry | undefined => {
      return [gameSystem, catalogue]
        .map((gs) => gs?.forceEntries?.forceEntry)
        .flat()
        .filter((f): f is ForceEntry => !!f)
        .find((f) => f['@_id'] === id);
    }
  );
