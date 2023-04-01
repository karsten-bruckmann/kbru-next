import { NgModule } from '@angular/core';
import {
  groupsCoreReducerRegistry,
  GroupsModule,
} from '@kbru/skat-list/data-access/groups';
import {
  playersCoreReducerRegistry,
  PlayersModule,
} from '@kbru/skat-list/data-access/players';

import { groupManagementName } from './group-management.name';
import { groupsReducer } from './reducers/groups.reducer';
import { playersReducer } from './reducers/player.reducer';

@NgModule({
  imports: [GroupsModule, PlayersModule],
})
export class GroupManagementModule {
  constructor() {
    groupsCoreReducerRegistry.add(groupsReducer, groupManagementName);
    playersCoreReducerRegistry.add(playersReducer, groupManagementName);
  }
}
