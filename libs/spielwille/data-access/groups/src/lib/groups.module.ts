import { NgModule } from '@angular/core';
import { createStorageSyncMetaReducer } from '@kbru/shared/utils/ngrx-storage-sync';
import { StoreModule } from '@ngrx/store';

import { groupsCoreReducerRegistry } from './groups.core-reducer-registry';
import { groupsSlice } from './groups.slice';
import { GroupsState } from './models/groups-state.model';
import { groupsReducer } from './reducers/groups.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<GroupsState>(groupsSlice, groupsReducer, {
      metaReducers: [
        createStorageSyncMetaReducer(groupsSlice, { storage: localStorage }),
        groupsCoreReducerRegistry.metaReducer,
      ],
    }),
  ],
})
export class GroupsModule {}
