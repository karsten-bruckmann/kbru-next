import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import {
  RosterEditingService,
  rosterSelector,
} from '@kbru/war-game-companion/core/roster-management';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

@Component({
  templateUrl: './forces.component.html',
  styleUrls: ['./forces.component.scss'],
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
