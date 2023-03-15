import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
  detachmentSelector,
  RosterManagementModule,
  rosterSelector,
  unitSelector,
} from '@kbru/battle-companion/core/roster-management';
import { routeParam, routeParams } from '@kbru/shared/utils/angular-utils';
import { Store } from '@ngrx/store';
import { combineLatest, map, switchMap } from 'rxjs';

import { UnitDetailsComponent } from './unit-details/unit-details.component';

@Component({
  selector: 'battle-companion-unit',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterLinkWithHref,
    RosterManagementModule,
    UnitDetailsComponent,
  ],
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
})
export class UnitComponent {
  constructor(private store$: Store, private activatedRoute: ActivatedRoute) {}

  public roster$ = routeParam('roster-id', this.activatedRoute).pipe(
    switchMap((rosterId) => this.store$.select(rosterSelector(rosterId)))
  );

  public detachment$ = routeParams(
    ['roster-id', 'detachment-index'],
    this.activatedRoute
  ).pipe(
    switchMap(([rosterId, detachmentIndex]) =>
      this.store$.select(
        detachmentSelector(rosterId, parseInt(detachmentIndex))
      )
    )
  );

  public unit$ = routeParam('unit-id', this.activatedRoute).pipe(
    switchMap((unitId) => this.store$.select(unitSelector(unitId)))
  );

  public detachmentRules$ = combineLatest([this.detachment$, this.unit$]).pipe(
    map(
      ([detachment, unit]) =>
        detachment?.rules.filter(
          (rule) =>
            unit?.rules.find(
              (unitRule) =>
                unitRule.title === rule.title &&
                unitRule.description === rule.description
            ) === undefined
        ) || []
    )
  );
}
