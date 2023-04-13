import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import {
  addGroupFormSubmittedAction,
  GroupFormService,
  GroupManagementModule,
} from '@kbru/spielwille/core/group-management';
import { Store } from '@ngrx/store';

import { GroupsListComponent } from './groups-list/groups-list.component';

@Component({
  selector: 'spielwille-start-page',
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
  constructor(
    private groupFormService: GroupFormService,
    private alertController: AlertController,
    private store$: Store
  ) {}

  protected async addGroup(): Promise<void> {
    let alert: HTMLIonAlertElement;
    const subscription = this.groupFormService.addForm$.subscribe(
      async (form) => {
        if (alert) {
          alert.dismiss();
        }
        alert = await this.alertController.create({
          header: 'Neue Gruppe',
          inputs: [
            {
              name: 'groupName',
              type: 'text',
              placeholder: 'Name',
              value: form.controls.groupName.value,
              handler: (input) => {
                form.controls.groupName.setValue(input.value);
              },
            },
          ],
          buttons: [
            {
              role: 'cancel',
              text: 'abbrechen',
              handler: () => subscription.unsubscribe(),
            },
            {
              text: 'OK',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              handler: (value: any) => {
                form.patchValue(value);
                if (form.valid) {
                  this.store$.dispatch(
                    addGroupFormSubmittedAction({
                      value: form.value,
                      created: new Date(),
                    })
                  );
                }
                return form.valid;
              },
            },
          ],
        });
        alert.present();
      }
    );
  }
}
