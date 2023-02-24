import { createCoreReducer } from '@kbru/architecture';
import { on } from '@ngrx/store';
import { RostersState } from 'rosters';

import { rosterFileUploaded } from '../actions/roster-file-uploaded.action';

export const rostersReducer = createCoreReducer<RostersState>(
  on(rosterFileUploaded, (state, action) => ({
    foo: action.request.id.toString(),
  }))
);
