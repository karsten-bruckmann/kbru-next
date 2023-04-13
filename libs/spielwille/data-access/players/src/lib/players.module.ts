import { NgModule } from '@angular/core';
import { createStorageSyncMetaReducer } from '@kbru/shared/utils/ngrx-storage-sync';
import { StoreModule } from '@ngrx/store';

import { playersCoreReducerRegistry } from './players.core-reducer-registry';
import { playersSlice } from './players.slice';
import { playersReducer } from './reducers/players.reducer';
import {
  PlayersState,
  playersStateSchema,
} from './schemas/players-state.schema';

@NgModule({
  imports: [
    StoreModule.forFeature<PlayersState>(playersSlice, playersReducer, {
      metaReducers: [
        createStorageSyncMetaReducer(playersSlice, {
          storage: localStorage,
          parse: (serialized) =>
            playersStateSchema.parse(serialized ? JSON.parse(serialized) : {}),
        }),
        playersCoreReducerRegistry.metaReducer,
      ],
    }),
  ],
})
export class PlayersModule {}
