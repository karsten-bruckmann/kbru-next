import { SelectionReference } from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { definitionDataSelector } from './definition-data.selector';

export const availableSelectionEntriesSelector = (categoryId: string) =>
  createSelector(
    definitionDataSelector,
    (definitionData): SelectionReference[] => {
      if (!definitionData) {
        return [];
      }

      return [
        ...(definitionData.entryLinks?.entryLink
          .filter((el) =>
            el.categoryLinks?.categoryLink
              .map((cl) => cl['@_targetId'])
              .includes(categoryId)
          )
          .map((el): SelectionReference => {
            return {
              id: el['@_id'],
              name: el['@_name'] || '__unknown__',
              type: el['@_type'],
              referenceType: 'entryLink',
            };
          }) || []),
        ...(definitionData.selectionEntries?.selectionEntry
          .filter((el) =>
            el.categoryLinks?.categoryLink
              .map((cl) => cl['@_targetId'])
              .includes(categoryId)
          )
          .map((el): SelectionReference => {
            return {
              id: el['@_id'],
              name: el['@_name'] || '__unknown__',
              type: el['@_type'],
              referenceType: 'selectionEntry',
            };
          }) || []),
        ...(definitionData.sharedSelectionEntries?.selectionEntry
          .filter((el) =>
            el.categoryLinks?.categoryLink
              .map((cl) => cl['@_targetId'])
              .includes(categoryId)
          )
          .map((el): SelectionReference => {
            return {
              id: el['@_id'],
              name: el['@_name'] || '__unknown__',
              type: el['@_type'],
              referenceType: 'sharedSelectionEntry',
            };
          }) || []),
      ]
        .filter((se) => ['selectionEntry', 'model', 'unit'].includes(se.type))
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  );
