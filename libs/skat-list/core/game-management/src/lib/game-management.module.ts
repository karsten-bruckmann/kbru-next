import { NgModule } from '@angular/core';
import { GroupsModule } from '@kbru/skat-list/data-access/groups';
import {
  skatGamesCoreReducerRegistry,
  SkatGamesModule,
} from '@kbru/skat-list/data-access/skat-games';
import {
  skatListsCoreReducerRegistry,
  SkatListsModule,
} from '@kbru/skat-list/data-access/skat-lists';

import { skatGamesReducer } from './reducers/skat-games.reducer';
import { skatListsReducer } from './reducers/skat-lists.reducer';

@NgModule({ imports: [GroupsModule, SkatListsModule, SkatGamesModule] })
export class GameManagementModule {
  constructor() {
    skatGamesCoreReducerRegistry.add(skatGamesReducer, 'game-management');
    skatListsCoreReducerRegistry.add(skatListsReducer, 'game-management');
  }
}
