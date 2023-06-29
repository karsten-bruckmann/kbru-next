import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import {
  RosterEditingService,
  rosterListSelector,
} from '@kbru/war-game-companion/core/roster-management';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

@Component({
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss'],
})
export class RepoComponent {
  constructor(
    private readonly store$: Store,
    protected readonly rosterEditingService: RosterEditingService,
    private readonly route: ActivatedRoute
  ) {}

  protected readonly repositoryName$ = this.route.paramMap.pipe(
    map((map) => map.get('repositoryName')),
    filterNullish()
  );

  protected readonly createRosterForm$ =
    this.rosterEditingService.getCreateRosterForm$();

  protected readonly rosters$ = this.repositoryName$.pipe(
    switchMap((repositoryName) =>
      this.store$.select(rosterListSelector(repositoryName))
    )
  );
}
