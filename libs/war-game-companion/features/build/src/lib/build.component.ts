import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
  RosterEditingService,
  rosterListSelector,
  RosterManagementModule,
} from '@kbru/war-game-companion/core/roster-management';
import { Store } from '@ngrx/store';

@Component({
  selector: 'war-game-companion-build',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    RosterManagementModule,
  ],
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss'],
})
export class BuildStartPageComponent {
  constructor(
    protected store$: Store,
    protected readonly rosterFormsService: RosterEditingService
  ) {}

  protected readonly createRosterForm$ =
    this.rosterFormsService.createRosterForm$;

  protected readonly rosters$ = this.store$.select(rosterListSelector);
}
