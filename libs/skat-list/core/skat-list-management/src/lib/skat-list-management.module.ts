import { NgModule } from '@angular/core';
import {
  groupsCoreReducerRegistry,
  GroupsModule,
} from '@kbru/skat-list/data-access/groups';
import { PlayersModule } from '@kbru/skat-list/data-access/players';
import {
  skatListsCoreReducerRegistry,
  SkatListsModule,
} from '@kbru/skat-list/data-access/skat-lists';

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
