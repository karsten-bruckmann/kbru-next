import {
  CategoryEntry,
  SelectionEntry,
  SelectionEntryGroup,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { SelectionReference } from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { findEntry } from '../rules/find-entry.rule';
import { definitionDataSelector } from './definition-data.selector';

export const availableCategorySelectionsSelector = (categoryId: string) =>
  createSelector(
    definitionDataSelector,
    (definitionData): SelectionReference[] => {
      if (!definitionData) {
        return [];
      }

      const category = findEntry<CategoryEntry>(
        categoryId,
        'CategoryEntry',
        definitionData
      );
      if (!category) {
        return [];
      }

      const result: SelectionReference[] = [
        ...(definitionData.entryLinks
          .filter((el) =>
            el.categoryLinks.map((cl) => cl.targetId).includes(categoryId)
          )
          .map((el): SelectionEntry | SelectionEntryGroup | null => {
            const se =
              el.type === 'selectionEntry'
                ? findEntry<SelectionEntry>(
                    el.targetId,
                    'SelectionEntry',
                    definitionData.sharedSelectionEntries
                  )
                : findEntry<SelectionEntryGroup>(
                    el.targetId,
                    'SelectionEntryGroup',
                    definitionData.sharedSelectionEntryGroups
                  );
            return se || null;
          }) || []),
        ...(definitionData.selectionEntries.filter((el) =>
          el.categoryLinks.map((cl) => cl.targetId).includes(categoryId)
        ) || []),
        ...(definitionData.sharedSelectionEntries.filter((el) =>
          el.categoryLinks.map((cl) => cl.targetId).includes(categoryId)
        ) || []),
        ...(definitionData.sharedSelectionEntryGroups.filter((el) =>
          el.categoryLinks.map((cl) => cl.targetId).includes(categoryId)
        ) || []),
      ]
        .filter((s): s is SelectionEntry | SelectionEntryGroup => !!s)
        .map(
          (s): SelectionReference => ({
            id: s.id,
            type: s.__type,
          })
        );

      return result;
    }
  );
