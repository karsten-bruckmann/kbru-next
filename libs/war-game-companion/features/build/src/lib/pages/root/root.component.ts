import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import {
  RosterEditingService,
  RosterManagementModule,
  rosterSelector,
} from '@kbru/war-game-companion/core/roster-management';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'war-game-companion-build-start-page-root',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    RosterManagementModule,
  ],
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  constructor(
    private route: ActivatedRoute,
    private readonly store$: Store,
    protected readonly rosterEditingService: RosterEditingService
  ) {}

  protected readonly rosterId$ = this.route.paramMap.pipe(
    map((map) => map.get('rosterId')),
    filterNullish()
  );

  protected readonly roster$ = this.rosterId$.pipe(
    switchMap((rosterId) => this.store$.select(rosterSelector(rosterId)))
  );

  protected readonly forces$ = this.roster$.pipe(
    map((roster) => roster?.forces)
  );

  protected readonly addForceForm$ = this.rosterId$.pipe(
    switchMap((rosterId) => this.rosterEditingService.addForceForm$(rosterId))
  );
}
