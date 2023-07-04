import { catalogueSelector } from '@kbru/war-game-companion/data-access/game-definition-data';
import { rostersFeatureSelector } from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';

export const rosterListSelector = createSelector(
  catalogueSelector,
  rostersFeatureSelector,
  (catalogue, rosters): NamedReference[] => {
    if (!rosters || !catalogue) {
      return [];
    }

    const catalogueRosters = rosters[catalogue?.['@_id']];
    if (!catalogueRosters) {
      return [];
    }

    return catalogueRosters.map((ros) => ({
      id: ros.id,
      name: ros.name,
    }));
  }
);
