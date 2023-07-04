import { createSelector } from '@ngrx/store';

import { HydratedSelectionReference } from '../models/hydrated-selection-reference.model';
import { definitionDataSelector } from './definition-data.selector';

export const availableSelectionEntriesSelector = (targetId: string) =>
  createSelector(
    definitionDataSelector,
    (definitionData): HydratedSelectionReference[] => {
      if (!definitionData) {
        return [];
      }

      return [
        ...(definitionData.entryLinks
          .filter((el) =>
            el.categoryLinks.map((cl) => cl.targetId).includes(targetId)
          )
          .map((el): HydratedSelectionReference => {
            return {
              id: el.id,
              name: el.name || '__unknown__',
              type: el.type,
              referenceType: 'entryLink',
            };
          }) || []),
        ...(definitionData.selectionEntries
          .filter((el) =>
            el.categoryLinks.map((cl) => cl.targetId).includes(targetId)
          )
          .map((el): HydratedSelectionReference => {
            return {
              id: el.id,
              name: el.name || '__unknown__',
              type: el.type,
              referenceType: 'selectionEntry',
            };
          }) || []),
        ...(definitionData.sharedSelectionEntries
          .filter((el) =>
            el.categoryLinks.map((cl) => cl.targetId).includes(targetId)
          )
          .map((el): HydratedSelectionReference => {
            return {
              id: el.id,
              name: el.name || '__unknown__',
              type: el.type,
              referenceType: 'sharedSelectionEntry',
            };
          }) || []),
      ]
        .filter((se) => ['selectionEntry', 'model', 'unit'].includes(se.type))
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  );
