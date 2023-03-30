import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { groupsCoreReducerRegistry } from './groups.core-reducer-registry';
import { groupsSlice } from './groups.slice';
import { GroupsState } from './models/groups-state.model';
import { groupsReducer } from './reducers/groups.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<GroupsState>(groupsSlice, groupsReducer, {
      metaReducers: [groupsCoreReducerRegistry.metaReducer],
    }),
  ],
})
export class GroupsModule {}
