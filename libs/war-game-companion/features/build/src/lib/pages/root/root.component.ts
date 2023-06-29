import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import {
  RosterEditingService,
  rosterSelector,
} from '@kbru/war-game-companion/core/roster-management';
import { Store } from '@ngrx/store';
import { combineLatest, map, switchMap } from 'rxjs';

@Component({
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  constructor(
    private route: ActivatedRoute,
    private readonly store$: Store,
    protected readonly rosterEditingService: RosterEditingService
  ) {}

  protected readonly repositoryName$ = this.route.paramMap.pipe(
    map((map) => map.get('repositoryName')),
    filterNullish()
  );

  protected readonly rosterId$ = this.route.paramMap.pipe(
    map((map) => map.get('rosterId')),
    filterNullish()
  );

  protected readonly roster$ = combineLatest([
    this.repositoryName$,
    this.rosterId$,
  ]).pipe(
    switchMap(([repositoryName, rosterId]) =>
      this.store$.select(rosterSelector(repositoryName, rosterId))
    )
  );

  protected readonly forces$ = this.roster$.pipe(
    map((roster) => roster?.forces)
  );

  protected readonly addForceForm$ = this.rosterEditingService.addForceForm$();
}
