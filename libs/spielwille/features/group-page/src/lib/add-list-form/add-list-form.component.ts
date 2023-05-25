import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { IonicListInputComponent } from '@kbru/shared/ui/ionic-list-input';
import {
  AddOnPipe,
  CalculationTypePipe,
  CentPerPointPipe,
  MaxSetsPipe,
  SpitzenPipe,
} from '@kbru/shared/ui/skat-naming';
import { PlayerFormService } from '@kbru/spielwille/core/group-management';
import {
  SkatListFormGroup,
  SkatListManagementModule,
} from '@kbru/spielwille/core/skat-list-management';
import { firstValueFrom, shareReplay, switchMap } from 'rxjs';

import { GroupPageComponent } from '../group-page.component';

@Component({
  selector: 'spielwille-group-page-add-list-form',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    IonicListInputComponent,
    ReactiveFormsModule,
    SkatListManagementModule,
    CalculationTypePipe,
    CentPerPointPipe,
    MaxSetsPipe,
    SpitzenPipe,
    AddOnPipe,
  ],
  templateUrl: './add-list-form.component.html',
  styleUrls: ['./add-list-form.component.scss'],
})
export class AddListFormComponent {
  constructor(
    private groupPageComponent: GroupPageComponent,
    private skatListFormGroup: SkatListFormGroup,
    private playerFormService: PlayerFormService,
    private alertController: AlertController
  ) {}

  public open = false;

  private groupId$ = this.groupPageComponent.groupId$;

  protected form$ = this.groupId$.pipe(
    switchMap((groupId) => this.skatListFormGroup.forGroup$(groupId)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected submit(form: SkatListFormGroup): void {
    this.skatListFormGroup.submit(form);
    this.open = false;
  }

  public getPlayerLabel(index: number): string {
    switch (index) {
      case 0:
        return '1. Spieler (Geber)';
      default:
        return `${index + 1}. Spieler`;
    }
  }

  public getPlayerPlaceholder(index: number): string | null {
    switch (index) {
      case 0:
      case 1:
      case 2:
        return null;
      default:
        return '-';
    }
  }

  public getAddPlayerCallback() {
    return () => {
      this.addPlayer();
    };
  }

  protected async addPlayer(): Promise<void> {
    let alert: HTMLIonAlertElement;
    const subscription = this.playerFormService
      .getAddForm$([await firstValueFrom(this.groupId$)])
      .subscribe(async (form) => {
        if (alert) {
          alert.dismiss();
        }
        alert = await this.alertController.create({
          header: 'Neuer Spieler',
          inputs: [
            {
              name: 'playerName',
              type: 'text',
              placeholder: 'Name',
              value: form.controls.playerName.value,
              handler: (input) => {
                form.controls.playerName.setValue(input.value);
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
                  this.playerFormService.submit(form);
                }
                return form.valid;
              },
            },
          ],
        });
        alert.present();
      });
  }
}
