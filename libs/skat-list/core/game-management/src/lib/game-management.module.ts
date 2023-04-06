import { NgModule } from '@angular/core';
import { GroupsModule } from '@kbru/skat-list/data-access/groups';
import { SkatGamesModule } from '@kbru/skat-list/data-access/skat-games';
import { SkatListsModule } from '@kbru/skat-list/data-access/skat-lists';

@NgModule({ imports: [GroupsModule, SkatListsModule, SkatGamesModule] })
export class GameManagementModule {}
