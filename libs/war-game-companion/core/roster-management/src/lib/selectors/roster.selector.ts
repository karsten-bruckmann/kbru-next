import {
  cataloguesSelector,
  forceSelector,
  gameSystemSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { rosterSelector as rosterDataSelector } from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { Roster } from '../models/roster.model';

export const rosterSelector = (repositoryName: string, rosterId: string) =>
  createSelector(
    rosterDataSelector(repositoryName, rosterId),
    gameSystemSelector,
    cataloguesSelector,
    (roster, gameSystem, catalogues): Roster | null =>
      !roster
        ? null
        : {
            repositoryName,
            id: roster.id,
            name: roster.name,
            forces: roster.forces
              .map((f): Roster['forces'][0] | null => {
                const force = forceSelector(f.id).projector(
                  gameSystem,
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
