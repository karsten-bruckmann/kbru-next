import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicListInputComponent } from '@kbru/shared/ui/ionic-list-input';
import {
  CalculationTypePipe,
  CentPerPointPipe,
  MaxSetsPipe,
  SpitzenPipe,
} from '@kbru/shared/ui/skat-naming';
import {
  SkatListFormService,
  SkatListManagementModule,
} from '@kbru/skat-list/core/skat-list-management';
import { filter, map, shareReplay, switchMap } from 'rxjs';

import { AddPlayerFormComponent } from '../add-player-form/add-player-form.component';

@Component({
  selector: 'skat-list-group-page-add-list-form',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    IonicListInputComponent,
    AddPlayerFormComponent,
    ReactiveFormsModule,
    SkatListManagementModule,
    CalculationTypePipe,
    CentPerPointPipe,
    MaxSetsPipe,
    SpitzenPipe,
  ],
  templateUrl: './add-list-form.component.html',
  styleUrls: ['./add-list-form.component.scss'],
})
export class AddListFormComponent {
  constructor(
    private skatListFormService: SkatListFormService,
    private activatedRoute: ActivatedRoute
  ) {}

  protected form$ = this.activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('groupId')),
    filter((groupId): groupId is string => !!groupId),
    switchMap((groupId) => this.skatListFormService.getForm$(groupId)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected addPlayerModalOpen = false;
  protected closeAddPlayerModal(): void {
    this.addPlayerModalOpen = false;
  }
  protected openAddPlayerModal(): void {
    this.addPlayerModalOpen = true;
  }

  public getPlayerName(id: string): string {
    return id.toUpperCase();
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
    return () => (this.addPlayerModalOpen = true);
  }
}
