import { forceSelector } from '@kbru/war-game-companion/data-access/game-definition-data';
import { Force } from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';
import { availableSelectionEntriesSelector } from './available-selection-entries.selector';
import { definitionDataSelector } from './definition-data.selector';

export const availableCategoriesSelector = (force: Force) =>
  createSelector(
    forceSelector(force.id),
    definitionDataSelector,
    (force, definitionData): NamedReference[] => {
      if (!force) {
        return [];
      }

      const categoryLinks = [
        force,
        ...force.forceEntries,
        ...force.forceEntries.map((fe) => fe.forceEntries).flat(),
      ]
        .map((fe) => fe.categoryLinks.flat())
        .flat();

      const uniqueCategoryLinks = categoryLinks.filter(
        (v, i, a) =>
          a.map((va) => va.targetId).findIndex((tid) => tid === v.targetId) ===
          i
      );

      const filteredCategories = uniqueCategoryLinks.filter(
        (cl) =>
          availableSelectionEntriesSelector(cl.targetId).projector(
            definitionData
          ).length > 0
      );

      return filteredCategories.map((c) => ({
        id: c.targetId,
        name: c.name || '__unknown__',
      }));
    }
  );
