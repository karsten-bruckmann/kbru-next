import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import { RosterEditingService } from '@kbru/war-game-companion/core/roster-management';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  templateUrl: './rosters.component.html',
  styleUrls: ['./rosters.component.scss'],
})
export class RostersComponent {
  constructor(
    protected readonly rosterEditingService: RosterEditingService,
    private readonly route: ActivatedRoute
  ) {}

  protected readonly catalogueName$ = this.rosterEditingService.catalogueName$;

  protected readonly createRosterForm$ =
    this.rosterEditingService.getCreateRosterForm$();

  protected readonly catalogueId$ = this.route.paramMap.pipe(
    map((map) => map.get('rosterId')),
    filterNullish()
  );

  protected readonly rosters$ = this.rosterEditingService.rosterList$;
}
