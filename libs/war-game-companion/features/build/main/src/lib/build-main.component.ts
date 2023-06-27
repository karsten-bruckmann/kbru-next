import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  RosterFormsService,
  rosterListSelector,
  RosterManagementModule,
} from '@kbru/war-game-companion/core/roster-management';
import { Store } from '@ngrx/store';

@Component({
  selector: 'war-game-companion-build-main',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RosterManagementModule,
  ],
  templateUrl: './build-main.component.html',
  styleUrls: ['./build-main.component.scss'],
})
export class BuildStartPageComponent {
  constructor(
    protected store$: Store,
    protected readonly rosterFormsService: RosterFormsService
  ) {}

  protected readonly createRosterForm$ = this.rosterFormsService.create$;

  protected readonly rosters$ = this.store$.select(rosterListSelector);
}
