import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
  RosterManagementModule,
  rosterSelector,
} from '@kbru/battle-companion/core/roster-management';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'battle-companion-roster-index',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RosterManagementModule,
    RouterLinkWithHref,
  ],
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss'],
})
export class RosterComponent {
  constructor(private activatedRoute: ActivatedRoute, private store$: Store) {}

  protected id$ = this.activatedRoute.params.pipe(
    map((params) => params['id'])
  );

  protected roster$ = this.id$.pipe(
    switchMap((id) => this.store$.select(rosterSelector(id)))
  );
}
