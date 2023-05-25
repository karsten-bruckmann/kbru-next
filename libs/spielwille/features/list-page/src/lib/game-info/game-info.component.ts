import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  Game,
  isNullGame,
  isRamschGame,
  isStandardGame,
} from '@kbru/spielwille/core/skat-game-management';
import { combineLatest, map, Observable, ReplaySubject } from 'rxjs';

import { ListPageComponent } from '../list-page.component';

@Component({
  selector: 'spielwille-list-page-game-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss'],
})
export class GameInfoComponent {
  constructor(private readonly listPageComponent: ListPageComponent) {}

  private readonly row$ = new ReplaySubject<number>();
  @Input() public set row(row: number) {
    this.row$.next(row);
  }

  private readonly game$: Observable<Game | null> = combineLatest([
    this.listPageComponent.list$,
    this.row$,
  ]).pipe(map(([list, row]) => list.games[row] ?? null));

  protected readonly infos$: Observable<string[]> = this.game$.pipe(
    map((game): string[] => {
      const infos: string[] = [];

      if (!game) {
        return [];
      }

      if (game.bock) {
        infos.push('B');
      }

      if (isStandardGame(game)) {
        const spritzen =
          game.spritze === 'kontra'
            ? ' K'
            : game.spritze === 're'
            ? ' KR'
            : game.spritze === 'hirsch'
            ? ' KRH'
            : '';
        infos.push(`${game.spitzen > 0 ? 'm' : 'o'}${Math.abs(game.spitzen)}`);
        if (spritzen) {
          infos.push(spritzen);
        }
      }

      if (isNullGame(game)) {
        if (game.nullType === 'einfach') {
          infos.push('');
        }
        if (game.nullType === 'hand') {
          infos.push('H');
        }
        if (game.nullType === 'ouvert') {
          infos.push('O');
        }
        if (game.nullType === 'hand-ouvert') {
          infos.push('HO');
        }
      }

      if (isRamschGame(game)) {
        if (game.jungfrau) {
          infos.push('J');
        }
        if (game.geschoben === 1) {
          infos.push('G');
        }
        if (game.geschoben === 2) {
          infos.push('2xG');
        }
      }

      return infos;
    })
  );
}
