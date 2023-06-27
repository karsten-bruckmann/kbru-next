import {
  cataloguesSelector,
  ForceEntry,
  gameSystemsSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { rosterSelector } from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

export const rosterForcesSelector = (rosterId: string) =>
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
      roster
        ? (roster?.forceIds || [])
            .map(
              (forceId) =>
                gameSystems[roster.gameSystemId]?.forceEntries.forceEntry.find(
                  (force) => force['@_id'] === forceId
                ) ||
                catalogues[roster.catalogueId]?.forceEntries?.forceEntry.find(
                  (force) => force['@_id'] === forceId
                ) ||
                null
            )
            .filter((force): force is ForceEntry => !!force)
            .map((force) => ({ id: force['@_id'], name: force['@_name'] }))
        : []
  );
