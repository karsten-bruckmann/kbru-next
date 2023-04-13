import { NgModule } from '@angular/core';
import {
  groupsCoreReducerRegistry,
  GroupsModule,
} from '@kbru/spielwille/data-access/groups';
import { PlayersModule } from '@kbru/spielwille/data-access/players';
import {
  skatListsCoreReducerRegistry,
  SkatListsModule,
} from '@kbru/spielwille/data-access/skat-lists';

import { groupsReducer } from './reducers/groups.reducer';
import { skatListsReducer } from './reducers/skat-lists.reducer';

@NgModule({
  imports: [SkatListsModule, PlayersModule, GroupsModule],
})
export class SkatListManagementModule {
  constructor() {
    skatListsCoreReducerRegistry.add(skatListsReducer, 'skat-list-management');
    groupsCoreReducerRegistry.add(groupsReducer, 'skat-list-management');
  }
}
