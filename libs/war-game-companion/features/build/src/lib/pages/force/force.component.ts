import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import {
  availableCategoriesSelector,
  RosterEditingService,
  rosterSelector,
} from '@kbru/war-game-companion/core/roster-management';
import { Store } from '@ngrx/store';
import { combineLatest, map, of, switchMap } from 'rxjs';

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

  protected readonly rosterId$ = this.route.paramMap.pipe(
    map((map) => map.get('rosterId')),
    filterNullish()
  );

  protected readonly forceIndex$ = this.route.paramMap.pipe(
    map((map) => map.get('forceIndex')),
    filterNullish(),
    map((i) => parseInt(i))
  );

  protected readonly roster$ = this.rosterId$.pipe(
    switchMap((rosterId) => this.store$.select(rosterSelector(rosterId))),
    filterNullish()
  );

  protected readonly force$ = combineLatest([
    this.roster$,
    this.forceIndex$,
  ]).pipe(
    map(([roster, forceIndex]) => roster?.forces[forceIndex]),
    filterNullish()
  );

  protected readonly categories$ = this.force$.pipe(
    switchMap((force) =>
      !force ? of([]) : this.store$.select(availableCategoriesSelector(force))
    )
  );

  protected readonly form$ = combineLatest([
    this.roster$,
    this.forceIndex$,
  ]).pipe(
    switchMap(([roster, forceIndex]) =>
      this.rosterEditingService.addSelectionEntryForm$(roster, forceIndex)
    )
  );
}
