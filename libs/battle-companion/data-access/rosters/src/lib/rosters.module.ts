import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LoadRostersEffect } from './effects/load-rosters.effect';
import { RostersState } from './models/rosters-state.model';
import { rostersReducer } from './reducers/rosters.reducer';
import { rostersCoreReducerRegistry } from './rosters.core-reducer-registry';
import { rostersSlice } from './rosters.slice';

@NgModule({
  imports: [
    StoreModule.forFeature<RostersState>(rostersSlice, rostersReducer, {
      metaReducers: [rostersCoreReducerRegistry.metaReducer],
    }),
    EffectsModule.forFeature([LoadRostersEffect]),
  ],
})
export class RostersModule {}
