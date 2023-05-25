import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map } from 'rxjs';

import { ListPageComponent } from '../list-page.component';

@Component({
  selector: 'spielwille-list-page-points-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './points-row.component.html',
  styleUrls: ['./points-row.component.scss'],
})
export class PointsRowComponent {
  constructor(private listPageComponent: ListPageComponent) {}

  protected points$ = this.listPageComponent.list$.pipe(
    map((list) => list.points)
  );
}
