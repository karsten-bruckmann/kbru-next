import { NgModule } from '@angular/core';
import { createStorageSyncMetaReducer } from '@kbru/shared/utils/ngrx-storage-sync';
import { StoreModule } from '@ngrx/store';

import { SkatListsState } from './models/skat-lists-state.model';
import { skatListsReducer } from './reducers/skat-lists.reducer';
import { skatListsCoreReducerRegistry } from './skat-lists.core-reducer-registry';
import { skatListsSlice } from './skat-lists.slice';

@NgModule({
  imports: [
    StoreModule.forFeature<SkatListsState>(skatListsSlice, skatListsReducer, {
      metaReducers: [
        createStorageSyncMetaReducer(skatListsSlice, { storage: localStorage }),
        skatListsCoreReducerRegistry.metaReducer,
      ],
    }),
  ],
})
export class SkatListsModule {}
