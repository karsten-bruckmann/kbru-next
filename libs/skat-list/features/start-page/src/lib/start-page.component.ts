import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GroupManagementModule } from '@kbru/skat-list/core/group-management';

import { AddGroupFormComponent } from './add-group-form/add-group-form.component';
import { GroupsListComponent } from './groups-list/groups-list.component';

@Component({
  selector: 'skat-list-start-page',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    GroupManagementModule,
    GroupsListComponent,
    AddGroupFormComponent,
  ],
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent {
  protected addGroupModalOpen = false;
  protected closeAddGroupModal(): void {
    this.addGroupModalOpen = false;
  }
  protected openAddGroupModal(): void {
    this.addGroupModalOpen = true;
  }
}
