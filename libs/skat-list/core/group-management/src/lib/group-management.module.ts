import { NgModule } from '@angular/core';
import {
  groupsCoreReducerRegistry,
  GroupsModule,
} from '@kbru/skat-list/data-access/groups';
import { PlayersModule } from '@kbru/skat-list/data-access/players';

import { groupManagementName } from './group-management.name';
import { groupsReducer } from './reducers/groups.reducer';

@NgModule({
  imports: [GroupsModule, PlayersModule],
})
export class GroupManagementModule {
  constructor() {
    groupsCoreReducerRegistry.add(groupsReducer, groupManagementName);
  }
}
