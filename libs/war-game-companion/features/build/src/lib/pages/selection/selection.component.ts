/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import {
  RosterEditingService,
  rosterSelector,
} from '@kbru/war-game-companion/core/roster-management';
import { Store } from '@ngrx/store';
import { findEntry } from 'libs/war-game-companion/core/roster-management/src/lib/rules/find-entry.rule';
import { definitionDataSelector } from 'libs/war-game-companion/core/roster-management/src/lib/selectors/definition-data.selector';
import { combineLatest, map, switchMap } from 'rxjs';

@Component({
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss'],
})
export class SelectionComponent {
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

  protected readonly selectionIndex$ = this.route.paramMap.pipe(
    map((map) => map.get('selectionIndex')),
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
    map(([roster, forceIndex]) => roster.forces[forceIndex]),
    filterNullish()
  );

  protected readonly selection$ = combineLatest([
    this.force$,
    this.selectionIndex$,
  ]).pipe(
    map(([force, selectionIndex]) => force.selections[selectionIndex]),
    filterNullish()
  );

  protected readonly selectionEntry$ = combineLatest([
    this.selection$,
    this.store$.select(definitionDataSelector),
  ]).pipe(
    map(([selection, data]) => findEntry(selection.id, data)),
    filterNullish()
  );
}
