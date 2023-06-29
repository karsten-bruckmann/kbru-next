import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import {
  availableCategoriesSelector,
  RosterEditingService,
  rosterSelector,
} from '@kbru/war-game-companion/core/roster-management';
import { Store } from '@ngrx/store';
import { combineLatest, map, switchMap } from 'rxjs';

@Component({
  templateUrl: './force.component.html',
  styleUrls: ['./force.component.scss'],
})
export class ForceComponent {
  constructor(
    private readonly route: ActivatedRoute,
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

  protected readonly forceIndex$ = this.route.paramMap.pipe(
    map((map) => map.get('forceIndex')),
    filterNullish(),
    map((i) => parseInt(i))
  );

  protected readonly roster$ = combineLatest([
    this.repositoryName$,
    this.rosterId$,
  ]).pipe(
    switchMap(([repositoryName, rosterId]) =>
      this.store$.select(rosterSelector(repositoryName, rosterId))
    )
  );

  protected readonly force$ = combineLatest([
    this.roster$,
    this.forceIndex$,
  ]).pipe(map(([roster, forceIndex]) => roster?.forces[forceIndex]));

  protected readonly categories$ = combineLatest([
    this.repositoryName$,
    this.rosterId$,
    this.forceIndex$,
  ]).pipe(
    switchMap(([repositoryName, rosterId, forceIndex]) =>
      this.store$.select(
        availableCategoriesSelector(repositoryName, rosterId, forceIndex)
      )
    )
  );

  protected readonly form$ = combineLatest([
    this.repositoryName$,
    this.rosterId$,
    this.forceIndex$,
  ]).pipe(
    switchMap(([repositoryName, rosterId, forceIndex]) =>
      this.rosterEditingService.addSelectionEntryForm$(
        repositoryName,
        rosterId,
        forceIndex
      )
    )
  );
}
