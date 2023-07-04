import { createSelector } from '@ngrx/store';

import { ForceEntry } from '../models/force-entry.model';
import { catalogueSelector } from './catalogue.selector';
import { gameSystemSelector } from './game-system.selector';

export const forceSelector = (id: string) =>
  createSelector(
    gameSystemSelector,
    catalogueSelector,
    (gameSystem, catalogue): ForceEntry | undefined => {
      return [gameSystem, catalogue]
        .map((gs) => gs?.forceEntries)
        .flat()
        .filter((f): f is ForceEntry => !!f)
        .find((f) => f.id === id);
    }
  );
