import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { filterNullish } from '@kbru/shared/utils/rxjs-utils';
import {
  availableCategoriesSelector,
  RosterEditingService,
  RosterManagementModule,
  rosterSelector,
} from '@kbru/war-game-companion/core/roster-management';
import { Store } from '@ngrx/store';
import { combineLatest, map, switchMap } from 'rxjs';

@Component({
  selector: 'war-game-companion-build-start-page-force',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    RosterManagementModule,
  ],
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
    switchMap((rosterId) => this.store$.select(rosterSelector(rosterId)))
  );

  protected readonly force$ = combineLatest([
    this.roster$,
    this.forceIndex$,
  ]).pipe(map(([roster, forceIndex]) => roster?.forces[forceIndex]));

  protected readonly categories$ = combineLatest([
    this.rosterId$,
    this.forceIndex$,
  ]).pipe(
    switchMap(([rosterId, forceIndex]) =>
      this.store$.select(availableCategoriesSelector(rosterId, forceIndex))
    )
  );
}
