import { createAction, props } from '@ngrx/store';
import { RostersRefreshAction } from 'rosters';

export const rosterFileUploaded: RostersRefreshAction = createAction(
  'roster-management/roster-file-uploaded',
  props<{
    request: { id: number };
  }>()
);
