import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { RelativeDatePipe } from '@kbru/shared/ui/date-pipes';
import { IonicHistoryBackComponent } from '@kbru/shared/ui/ionic-history-back';
import {
  CalculationTypePipe,
  ListSummaryPipe,
} from '@kbru/shared/ui/skat-naming';
import { routeParam } from '@kbru/shared/utils/angular-utils';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import {
  groupDeletedAction,
  GroupManagementModule,
  groupSelector,
} from '@kbru/spielwille/core/group-management';
import {
  listsCollectionSelector,
  SkatListManagementModule,
} from '@kbru/spielwille/core/skat-list-management';
import { Store } from '@ngrx/store';
import { firstValueFrom, shareReplay, switchMap } from 'rxjs';

import { AddListFormComponent } from './add-list-form/add-list-form.component';

@Component({
  selector: 'spielwille-group-page',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    GroupManagementModule,
    SkatListManagementModule,
    AddListFormComponent,
    ListSummaryPipe,
    RelativeDatePipe,
    IonicHistoryBackComponent,
  ],
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss'],
})
export class GroupPageComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private store$: Store,
    private alertController: AlertController,
    private router: Router
  ) {}

  protected popoverMenuOpen = false;
  protected addListModalOpen = false;

  public readonly groupId$ = routeParam('groupId', this.activatedRoute);

  public readonly group$ = this.groupId$.pipe(
    switchMap((groupId) => this.store$.select(groupSelector(groupId))),
    filterNullish(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected lists$ = this.group$.pipe(
    switchMap((group) => this.store$.select(listsCollectionSelector(group.id)))
  );

  protected async deleteGroup(): Promise<void> {
    const { name, id } = await firstValueFrom(
      this.group$.pipe(filterNullish())
    );
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
            this.router.navigateByUrl('/');
          },
        },
      ],
    });
    await alert.present();
  }
}
