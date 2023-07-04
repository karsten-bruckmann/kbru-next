import {
  Roster,
  SelectionReference,
} from '@kbru/war-game-companion/data-access/rosters';
import { createAction, props } from '@ngrx/store';

export const addSelectionEntryFormSubmitted = createAction(
  'roster-management/add-selection-entry-form-submitted',
  props<{
    roster: Roster;
    forceIndex: number;
    value: {
      categoryId: string;
      selectionReference: SelectionReference;
    };
  }>()
);
