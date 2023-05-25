import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GameTypePipe } from '@kbru/shared/ui/skat-naming';
import { Game } from '@kbru/spielwille/core/skat-game-management';
import { combineLatest, map, Observable, ReplaySubject } from 'rxjs';

import { ListPageComponent } from '../list-page.component';

@Component({
  selector: 'spielwille-list-page-game-row',
  standalone: true,
  imports: [CommonModule, IonicModule, GameTypePipe],
  templateUrl: './game-row.component.html',
  styleUrls: ['./game-row.component.scss'],
})
export class GameRowComponent {
  constructor(private readonly listPageComponent: ListPageComponent) {}

  private readonly row$ = new ReplaySubject<number>();
  @Input() public set row(row: number) {
    this.row$.next(row);
  }

  protected readonly playerNames$ = this.listPageComponent.playerNames$;

  protected readonly game$: Observable<Game | null> = combineLatest([
    this.listPageComponent.list$,
    this.row$,
  ]).pipe(map(([list, row]) => list.games[row] ?? null));
}
