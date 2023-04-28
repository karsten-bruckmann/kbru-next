import { NgModule } from '@angular/core';
import { GroupsModule } from '@kbru/spielwille/data-access/groups';
import {
  skatGamesCoreReducerRegistry,
  SkatGamesModule,
} from '@kbru/spielwille/data-access/skat-games';
import {
  skatListsCoreReducerRegistry,
  SkatListsModule,
} from '@kbru/spielwille/data-access/skat-lists';
import { EffectsModule } from '@ngrx/effects';

import { UpdateListStatusEffect } from './effects/update-list-status.effect';
import { skatGamesReducer } from './reducers/skat-games.reducer';
import { skatListsReducer } from './reducers/skat-lists.reducer';

@NgModule({
  imports: [
    GroupsModule,
    SkatListsModule,
    SkatGamesModule,
    EffectsModule.forFeature([UpdateListStatusEffect]),
  ],
})
export class SkatGameManagementModule {
  constructor() {
    skatGamesCoreReducerRegistry.add(skatGamesReducer, 'game-management');
    skatListsCoreReducerRegistry.add(skatListsReducer, 'game-management');
  }
}
