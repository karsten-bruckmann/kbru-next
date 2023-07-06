import {
  CategoryEntry,
  ForceEntry,
  forceSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { Force } from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';
import { findEntry } from '../rules/find-entry.rule';
import { definitionDataSelector } from './definition-data.selector';

export const availableCategoriesSelector = (force: Force) =>
  createSelector(
    forceSelector(force.id),
    definitionDataSelector,

    (force, definitionData): NamedReference[] => {
      if (!force) {
        return [];
      }

      const categories: CategoryEntry[] = (
        findEntry<ForceEntry>(force.id, 'ForceEntry', definitionData)
          ?.categoryLinks || []
      )
        .map((cl) =>
          findEntry<CategoryEntry>(cl.targetId, 'CategoryEntry', definitionData)
        )
        .filter((c): c is CategoryEntry => !!c);

      return categories.map((c) => ({
        id: c.id,
        name: c.name || '__unknown__',
      }));
    }
  );
