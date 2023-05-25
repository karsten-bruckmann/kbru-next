import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SkatGameManagementModule } from '@kbru/spielwille/core/skat-game-management';
import { SkatListManagementModule } from '@kbru/spielwille/core/skat-list-management';
import { map } from 'rxjs';

import { ListPageComponent } from '../list-page.component';

@Component({
  selector: 'spielwille-list-page-player-header',
  standalone: true,
  imports: [
    CommonModule,
    SkatGameManagementModule,
    SkatListManagementModule,
    RouterModule,
  ],
  templateUrl: './player-header.component.html',
  styleUrls: ['./player-header.component.scss'],
})
export class PlayerHeaderComponent {
  constructor(private listPageComponent: ListPageComponent) {}

  private list$ = this.listPageComponent.list$;

  protected playerNames$ = this.listPageComponent.playerNames$;

  protected status$ = this.list$.pipe(map((list) => list?.status || null));
}
