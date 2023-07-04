import {
  EntryLink,
  SelectionEntry,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';
import { definitionDataSelector } from './definition-data.selector';

type SelectionReference = NamedReference & {
  type: EntryLink['@_type'] | SelectionEntry['@_type'];
};

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
            };
          }) || []),
      ]
        .filter((se) => ['selectionEntry', 'model', 'unit'].includes(se.type))
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  );
