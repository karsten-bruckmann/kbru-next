import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';
import { definitionDataSelector } from './definition-data.selector';

type SelectionReference = NamedReference & {
  type: 'entryLink' | 'selectionEntry';
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
              type: 'entryLink',
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
              type: 'entryLink',
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
              type: 'entryLink',
            };
          }) || []),
      ];
    }
  );
