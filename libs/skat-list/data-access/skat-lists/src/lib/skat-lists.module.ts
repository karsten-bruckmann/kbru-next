import { NgModule } from '@angular/core';
import { createStorageSyncMetaReducer } from '@kbru/shared/utils/ngrx-storage-sync';
import { StoreModule } from '@ngrx/store';

import { skatListsReducer } from './reducers/skat-lists.reducer';
import {
  SkatListsState,
  skatListsStateSchema,
} from './schemas/skat-lists-state.schema';
import { skatListsCoreReducerRegistry } from './skat-lists.core-reducer-registry';
import { skatListsSlice } from './skat-lists.slice';

@NgModule({
  imports: [
    StoreModule.forFeature<SkatListsState>(skatListsSlice, skatListsReducer, {
      metaReducers: [
        createStorageSyncMetaReducer(skatListsSlice, {
          storage: localStorage,
          parse: (serialized) =>
            skatListsStateSchema.parse(
              serialized ? JSON.parse(serialized) : {}
            ),
        }),
        skatListsCoreReducerRegistry.metaReducer,
      ],
    }),
  ],
})
export class SkatListsModule {}
