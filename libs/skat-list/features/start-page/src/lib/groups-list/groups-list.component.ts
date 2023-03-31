import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import {
  groupDeletedAction,
  GroupManagementModule,
  groupsListSelector,
} from '@kbru/skat-list/core/group-management';
import { Store } from '@ngrx/store';

@Component({
  selector: 'skat-list-start-page-groups-list',
  standalone: true,
  imports: [CommonModule, IonicModule, GroupManagementModule, RouterModule],
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
})
export class GroupsListComponent {
  constructor(
    private store$: Store,
    private alertController: AlertController
  ) {}

  protected list$ = this.store$.select(groupsListSelector);

  protected async delete(id: string, name: string): Promise<void> {
    const alert = await this.alertController.create({
      header: `${name} löschen?`,
      subHeader: 'Möchtest du die Gruppe löschen?',
      message: 'Das kann nicht rückgängig gemacht werden!',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
          handler: () => {
            return;
          },
        },
        {
          text: 'Ja',
          role: 'confirm',
          handler: () => {
            this.store$.dispatch(groupDeletedAction({ id }));
          },
        },
      ],
    });
    await alert.present();
  }
}
