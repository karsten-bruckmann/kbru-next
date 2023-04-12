import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { routeParam } from '@kbru/shared/utils/angular-utils';
import {
  GameManagementModule,
  listSelector,
} from '@kbru/skat-list/core/game-management';
import { GroupManagementModule } from '@kbru/skat-list/core/group-management';
import { SkatListManagementModule } from '@kbru/skat-list/core/skat-list-management';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';

import { AddGameFormComponent } from './add-game-form/add-game-form.component';

@Component({
  selector: 'skat-list-list-page',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    GameManagementModule,
    SkatListManagementModule,
    GroupManagementModule,
    AddGameFormComponent,
  ],
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent {
  constructor(private activatedRoute: ActivatedRoute, private store$: Store) {}

  protected addGameModalOpen = false;

  protected list$ = routeParam('listId', this.activatedRoute).pipe(
    switchMap((listId) => this.store$.select(listSelector(listId)))
  );
}
