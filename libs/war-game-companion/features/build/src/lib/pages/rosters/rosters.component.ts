import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RosterEditingService } from '@kbru/war-game-companion/core/roster-management';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './rosters.component.html',
  styleUrls: ['./rosters.component.scss'],
})
export class RostersComponent {
  constructor(
    private readonly store$: Store,
    protected readonly rosterEditingService: RosterEditingService,
    private readonly route: ActivatedRoute
  ) {}

  protected readonly createRosterForm$ =
    this.rosterEditingService.getCreateRosterForm$();

  protected readonly rosters$ = this.rosterEditingService.rosterList$;
}
