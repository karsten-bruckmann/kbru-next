import {
  catalogueSelector,
  forceSelector,
  gameSystemSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { rosterSelector as rosterDataSelector } from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { Roster } from '../models/roster.model';

export const rosterSelector = (rosterId: string) =>
  createSelector(
    rosterDataSelector(rosterId),
    gameSystemSelector,
    catalogueSelector,
    (roster, gameSystem, catalogue): Roster | null => {
      return !roster
        ? null
        : {
            id: roster.id,
            name: roster.name,
            catalogueId: roster.catalogueId,
            forces: roster.forces
              .map((f): Roster['forces'][0] | null => {
                const force = forceSelector(f.id).projector(
                  gameSystem,
                  catalogue
                );
                if (!force) {
                  return null;
                }
                return {
                  id: f.id,
                  name: force?.['@_name'],
                };
              })
              .filter((f): f is Roster['forces'][0] => !!f),
          };
    }
  );
