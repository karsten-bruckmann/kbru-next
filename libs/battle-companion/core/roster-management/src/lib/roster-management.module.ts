import { NgModule } from '@angular/core';
import {
  rostersCoreReducerRegistry,
  RostersModule,
} from '@kbru/battle-companion/data-access/rosters';
import { EffectsModule } from '@ngrx/effects';

import { ParseRosterEffect } from './effects/parse-roster.effect';
import { rostersReducer } from './reducers/rosters.reducer';

@NgModule({
  imports: [EffectsModule.forFeature([ParseRosterEffect]), RostersModule],
})
export class RosterManagementModule {
  constructor() {
    rostersCoreReducerRegistry.add(rostersReducer, 'RosterManagementModule');
  }
}
