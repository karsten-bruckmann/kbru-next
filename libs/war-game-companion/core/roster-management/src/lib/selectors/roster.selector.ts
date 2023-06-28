import {
  cataloguesSelector,
  forceSelector,
  gameSystemsSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { rosterSelector as rosterDataSelector } from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { Roster } from '../models/roster.model';

export const rosterSelector = (rosterId: string) =>
  createSelector(
    rosterDataSelector(rosterId),
    gameSystemsSelector,
    cataloguesSelector,
    (roster, gameSystems, catalogues): Roster | null =>
      !roster
        ? null
        : {
            id: roster.id,
            name: roster.name,
            gameSystemId: roster.gameSystemId,
            forces: roster.forces
              .map((f): Roster['forces'][0] | null => {
                const force = forceSelector(f.id).projector(
                  gameSystems,
                  catalogues
                );
                if (!force) {
                  return null;
                }
                return {
                  id: f.id,
                  name: force?.['@_name'],
                  catalogueId: f.catalogueId,
                };
              })
              .filter((f): f is Roster['forces'][0] => !!f),
          }
  );
