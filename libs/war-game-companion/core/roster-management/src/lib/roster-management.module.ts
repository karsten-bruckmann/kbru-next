import { NgModule } from '@angular/core';
import { GameDefinitionDataModule } from '@kbru/war-game-companion/data-access/game-definition-data';
import {
  rostersCoreReducerRegistry,
  RostersModule,
} from '@kbru/war-game-companion/data-access/rosters';

import { rostersReducer } from './reducers/rosters.reducer';

@NgModule({
  imports: [GameDefinitionDataModule, RostersModule],
})
export class RosterManagementModule {
  constructor() {
    rostersCoreReducerRegistry.add(rostersReducer, 'roster-management');
  }
}
