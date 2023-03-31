import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  GroupManagementModule,
  groupsListSelector,
} from '@kbru/skat-list/core/group-management';
import { Store } from '@ngrx/store';

@Component({
  selector: 'skat-list-start-page-groups-list',
  standalone: true,
  imports: [CommonModule, IonicModule, GroupManagementModule],
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
})
export class GroupsListComponent {
  constructor(private store$: Store) {}

  protected list$ = this.store$.select(groupsListSelector);
}
