import { NgModule } from '@angular/core';
import { createStorageSyncMetaReducer } from '@kbru/shared/utils/ngrx-storage-sync';
import { StoreModule } from '@ngrx/store';

import { groupsCoreReducerRegistry } from './groups.core-reducer-registry';
import { groupsSlice } from './groups.slice';
import { groupsReducer } from './reducers/groups.reducer';
import { GroupsState, groupsStateSchema } from './schemas/groups-state.schema';

@NgModule({
  imports: [
    StoreModule.forFeature<GroupsState>(groupsSlice, groupsReducer, {
      metaReducers: [
        createStorageSyncMetaReducer(groupsSlice, {
          storage: localStorage,
          parse: (serialized) =>
            groupsStateSchema.parse(serialized ? JSON.parse(serialized) : {}),
        }),
        groupsCoreReducerRegistry.metaReducer,
      ],
    }),
  ],
})
export class GroupsModule {}
