import { Component } from '@angular/core';
import { dataIndexSelector } from '@kbru/war-game-companion/core/roster-management';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss'],
  standalone: false,
})
export class BuildComponent {
  constructor(protected store$: Store) {}

  protected readonly dataIndex$ = this.store$.select(dataIndexSelector);
}
