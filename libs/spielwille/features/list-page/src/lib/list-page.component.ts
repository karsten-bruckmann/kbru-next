import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { routeParam } from '@kbru/shared/utils/angular-utils';
import { GroupManagementModule } from '@kbru/spielwille/core/group-management';
import {
  listSelector,
  SkatGameManagementModule,
} from '@kbru/spielwille/core/skat-game-management';
import { SkatListManagementModule } from '@kbru/spielwille/core/skat-list-management';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';

import { AddGameFormComponent } from './add-game-form/add-game-form.component';

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
