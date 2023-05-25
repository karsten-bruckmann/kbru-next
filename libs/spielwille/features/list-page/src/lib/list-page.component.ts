import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicHistoryBackComponent } from '@kbru/shared/ui/ionic-history-back';
import { GameTypePipe, ListSummaryPipe } from '@kbru/shared/ui/skat-naming';
import { routeParam } from '@kbru/shared/utils/angular-utils';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import { GroupManagementModule } from '@kbru/spielwille/core/group-management';
import {
  listSelector,
  SkatGameManagementModule,
} from '@kbru/spielwille/core/skat-game-management';
import { SkatListManagementModule } from '@kbru/spielwille/core/skat-list-management';
import { Store } from '@ngrx/store';
import { map, shareReplay, switchMap } from 'rxjs';

import { AddGameFormComponent } from './add-game-form/add-game-form.component';
import { DebugComponent } from './debug/debug.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { GameRowComponent } from './game-row/game-row.component';
import { PlayerHeaderComponent } from './player-header/player-header.component';
import { PointsRowComponent } from './points-row/points-row.component';

@Component({
  selector: 'spielwille-list-page',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    SkatGameManagementModule,
    SkatListManagementModule,
    GroupManagementModule,
    AddGameFormComponent,
    IonicHistoryBackComponent,
    GameTypePipe,
    PlayerHeaderComponent,
    DebugComponent,
    GameRowComponent,
    PointsRowComponent,
    GameInfoComponent,
    ListSummaryPipe,
  ],
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent {
  constructor(private activatedRoute: ActivatedRoute, private store$: Store) {}

  protected addGameModalOpen = false;

  public readonly list$ = routeParam('listId', this.activatedRoute).pipe(
    switchMap((listId) => this.store$.select(listSelector(listId))),
    filterNullish(),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  public readonly playerNames$ = this.list$.pipe(
    map((list) => list?.playerNames || null)
  );

  protected debug = false;
}
