import { NgModule } from '@angular/core';
import { createStorageSyncMetaReducer } from '@kbru/shared/utils/ngrx-storage-sync';
import { StoreModule } from '@ngrx/store';

import { PlayersState } from './models/players-state.model';
import { playersCoreReducerRegistry } from './players.core-reducer-registry';
import { playersSlice } from './players.slice';
import { playersReducer } from './reducers/players.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<PlayersState>(playersSlice, playersReducer, {
      metaReducers: [
        createStorageSyncMetaReducer(playersSlice, { storage: localStorage }),
        playersCoreReducerRegistry.metaReducer,
      ],
    }),
  ],
})
export class PlayersModule {}
