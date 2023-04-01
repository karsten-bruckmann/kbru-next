import { NgModule } from '@angular/core';
import { PlayersModule } from '@kbru/skat-list/data-access/players';
import { SkatListsModule } from '@kbru/skat-list/data-access/skat-lists';

@NgModule({
  imports: [SkatListsModule, PlayersModule],
})
export class SkatListManagementModule {}
