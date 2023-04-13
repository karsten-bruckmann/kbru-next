import { NgModule } from '@angular/core';
import { createStorageSyncMetaReducer } from '@kbru/shared/utils/ngrx-storage-sync';
import { StoreModule } from '@ngrx/store';

import { SkatGamesState } from './models/skat-games-state.model';
import { skatGamesReducer } from './reducers/skat-games.reducer';
import { skatGamesCoreReducerRegistry } from './skat-games.core-reducer-registry';
import { skatGamesSlice } from './skat-games.slice';

@NgModule({
  imports: [
    StoreModule.forFeature<SkatGamesState>(skatGamesSlice, skatGamesReducer, {
      metaReducers: [
        createStorageSyncMetaReducer(skatGamesSlice, { storage: localStorage }),
        skatGamesCoreReducerRegistry.metaReducer,
      ],
    }),
  ],
})
export class SkatGamesModule {}
