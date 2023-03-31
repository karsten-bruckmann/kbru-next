import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
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
  ],
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent {
  constructor(private modalController: ModalController) {}

  protected async addGroup(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddGroupFormComponent,
    });
    await modal.present();
  }
}
