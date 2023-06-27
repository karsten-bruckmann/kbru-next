import {
  cataloguesSelector,
  gameSystemsSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { rosterSelector } from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

export const availableForcesSelector = (rosterId: string) =>
  createSelector(
    rosterSelector(rosterId),
    gameSystemsSelector,
    cataloguesSelector,
    (
      roster,
      gameSystems,
      catalogues
    ): {
      id: string;
      name: string;
    }[] =>
      !roster
        ? []
        : [
            ...(gameSystems[roster.gameSystemId]?.forceEntries.forceEntry ||
              []),
            ...(catalogues[roster.catalogueId]?.forceEntries?.forceEntry || []),
          ].map((force) => ({
            id: force['@_id'],
            name: force['@_name'],
          }))
  );
