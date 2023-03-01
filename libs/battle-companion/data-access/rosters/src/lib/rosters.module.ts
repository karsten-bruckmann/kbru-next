import { NgModule } from '@angular/core';
import { createStorageSyncMetaReducer } from '@kbru/shared/utils/ngrx-storage-sync';
import { StoreModule } from '@ngrx/store';

import { RostersState } from './models/rosters-state.model';
import { rostersReducer } from './reducers/rosters.reducer';
import { rostersCoreReducerRegistry } from './rosters.core-reducer-registry';
import { rostersSlice } from './rosters.slice';

@NgModule({
  imports: [
    StoreModule.forFeature<RostersState>(rostersSlice, rostersReducer, {
      metaReducers: [
        createStorageSyncMetaReducer(rostersSlice, {
          storage: localStorage,
        }),
        rostersCoreReducerRegistry.metaReducer,
      ],
    }),
  ],
})
export class RostersModule {}
