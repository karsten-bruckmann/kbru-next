import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { PlayersState } from './models/players-state.model';
import { playersCoreReducerRegistry } from './players.core-reducer-registry';
import { playersSlice } from './players.slice';
import { playersReducer } from './reducers/players.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<PlayersState>(playersSlice, playersReducer, {
      metaReducers: [playersCoreReducerRegistry.metaReducer],
    }),
  ],
})
export class PlayersModule {}
