import { NgModule } from '@angular/core';
import {
  rostersCoreReducerRegistry,
  RostersModule,
  rostersRefreshActionRegistry,
} from 'rosters';

import { rosterFileUploaded } from './actions/roster-file-uploaded.action';
import { rostersReducer } from './reducers/rosters.reducer';

@NgModule({
  imports: [RostersModule],
})
export class RosterManagementModule {
  constructor() {
    rostersCoreReducerRegistry.add(rostersReducer, 'RosterManagementModule');
    rostersRefreshActionRegistry.add(rosterFileUploaded);
  }
}
