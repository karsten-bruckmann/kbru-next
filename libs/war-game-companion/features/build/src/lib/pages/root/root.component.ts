import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import {
  RosterEditingService,
  RosterManagementModule,
} from '@kbru/war-game-companion/core/roster-management';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'war-game-companion-build-start-page-root',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RosterManagementModule,
  ],
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  constructor(
    private route: ActivatedRoute,
    protected readonly rosterEditingService: RosterEditingService
  ) {}

  public forces$ = this.route.paramMap.pipe(
    map((map) => map.get('rosterId')),
    filterNullish(),
    switchMap((rosterId) => this.rosterEditingService.forces$(rosterId))
  );

  public addForceForm$ = this.route.paramMap.pipe(
    map((map) => map.get('rosterId')),
    filterNullish(),
    switchMap((rosterId) => this.rosterEditingService.addForceForm$(rosterId))
  );
}
