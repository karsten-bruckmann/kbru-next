import { forceSelector } from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';
import { Roster } from '../models/roster.model';
import { availableSelectionEntriesSelector } from './available-selection-entries.selector';
import { definitionDataSelector } from './definition-data.selector';

export const availableCategoriesSelector = (force: Roster['forces'][0]) =>
  createSelector(
    forceSelector(force.id),
    definitionDataSelector,
    (force, definitionData): NamedReference[] => {
      if (!force) {
        return [];
      }

      const categoryLinks = [
        force,
        ...(force.forceEntries?.forceEntry || []),
        ...(
          force.forceEntries?.forceEntry.map(
            (fe) => fe.forceEntries?.forceEntry || []
          ) || []
        ).flat(),
      ]
        .map((fe) => fe.categoryLinks.categoryLink.flat())
        .flat();

      const uniqueCategoryLinks = categoryLinks.filter(
        (v, i, a) =>
          a
            .map((va) => va['@_targetId'])
            .findIndex((tid) => tid === v['@_targetId']) === i
      );

      const filteredCategories = uniqueCategoryLinks.filter(
        (cl) =>
          availableSelectionEntriesSelector(cl['@_targetId']).projector(
            definitionData
          ).length > 0
      );

      return filteredCategories.map((c) => ({
        id: c['@_targetId'],
        name: c['@_name'] || '__unknown__',
      }));
    }
  );
