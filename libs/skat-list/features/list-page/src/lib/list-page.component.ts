import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { routeParam } from '@kbru/shared/utils/angular-utils';
import { GameManagementModule } from '@kbru/skat-list/core/game-management';
import { GroupManagementModule } from '@kbru/skat-list/core/group-management';
import {
  listSelector,
  SkatListManagementModule,
} from '@kbru/skat-list/core/skat-list-management';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';

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
  ],
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent {
  constructor(private activatedRoute: ActivatedRoute, private store$: Store) {}

  protected list$ = routeParam('listId', this.activatedRoute).pipe(
    switchMap((listId) => this.store$.select(listSelector(listId)))
  );
}
