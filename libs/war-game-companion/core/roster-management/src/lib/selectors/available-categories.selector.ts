import {
  cataloguesSelector,
  forceSelector,
  gameSystemsSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';
import { rosterSelector } from './roster.selector';

export const availableCategoriesSelector = (
  rosterId: string,
  forceIndex: number
) =>
  createSelector(
    rosterSelector(rosterId),
    gameSystemsSelector,
    cataloguesSelector,
    (roster, gameSystems, catalogues): NamedReference[] => {
      const forceId = roster?.forces[forceIndex]?.id;
      if (!forceId) {
        return [];
      }

      const force = forceSelector(forceId).projector(gameSystems, catalogues);
      if (!force) {
        return [];
      }

      return force.categoryLinks.categoryLink.map((c) => ({
        id: c['@_id'],
        name: c['@_name'] || '__unknown__',
      }));
    }
  );
