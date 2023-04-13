import { NgModule } from '@angular/core';
import { createStorageSyncMetaReducer } from '@kbru/shared/utils/ngrx-storage-sync';
import { StoreModule } from '@ngrx/store';

import { skatGamesReducer } from './reducers/skat-games.reducer';
import {
  SkatGamesState,
  skatGamesStateSchema,
} from './schemas/skat-games-state.schema';
import { skatGamesCoreReducerRegistry } from './skat-games.core-reducer-registry';
import { skatGamesSlice } from './skat-games.slice';

@NgModule({
  imports: [
    StoreModule.forFeature<SkatGamesState>(skatGamesSlice, skatGamesReducer, {
      metaReducers: [
        createStorageSyncMetaReducer(skatGamesSlice, {
          storage: localStorage,
          parse: (serialized) =>
            skatGamesStateSchema.parse(
              serialized ? JSON.parse(serialized) : {}
            ),
        }),
        skatGamesCoreReducerRegistry.metaReducer,
      ],
    }),
  ],
})
export class SkatGamesModule {}
