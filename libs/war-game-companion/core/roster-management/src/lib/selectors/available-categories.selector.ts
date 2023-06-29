import {
  cataloguesSelector,
  forceSelector,
  gameSystemSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';
import { rosterSelector } from './roster.selector';

export const availableCategoriesSelector = (
  repositoryName: string,
  rosterId: string,
  forceIndex: number
) =>
  createSelector(
    rosterSelector(repositoryName, rosterId),
    gameSystemSelector,
    cataloguesSelector,
    (
      roster,
      gameSystems,
      catalogues
    ): (NamedReference & { targetId: string })[] => {
      const forceId = roster?.forces[forceIndex]?.id;
      if (!forceId) {
        return [];
      }

      const force = forceSelector(forceId).projector(gameSystems, catalogues);
      if (!force) {
        return [];
      }

      const categoryLinks = [
        ...(force.forceEntries?.forceEntry || []),
        ...(
          force.forceEntries?.forceEntry.map(
            (fe) => fe.forceEntries?.forceEntry || []
          ) || []
        ).flat(),
      ]
        .map((fe) => fe.categoryLinks.categoryLink.flat())
        .flat();
      console.log(categoryLinks);

      return categoryLinks.map((c) => ({
        id: c['@_id'],
        targetId: c['@_targetId'],
        name: c['@_name'] || '__unknown__',
      }));
    }
  );
