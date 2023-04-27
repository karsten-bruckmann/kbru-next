import { Pipe, PipeTransform } from '@angular/core';

type GameType =
  | 'diamonds'
  | 'hearts'
  | 'spades'
  | 'clubs'
  | 'grand'
  | 'null'
  | 'ramsch'
  | 'durchmarsch';

@Pipe({
  name: 'gameType',
  standalone: true,
})
export class GameTypePipe implements PipeTransform {
  private symbols: { [key in GameType]?: string } = {
    diamonds: '♦️',
    hearts: '♥️',
    spades: '♠️',
    clubs: '♣️',
  };

  private texts: Record<GameType, string> = {
    diamonds: 'Karo',
    hearts: 'Herz',
    spades: 'Pik',
    clubs: 'Kreuz',
    grand: 'Grand',
    null: 'Null',
    ramsch: 'Ramsch',
    durchmarsch: 'Durchmarsch',
  };

  transform<T = unknown>(value: T): T | string {
    if (!Object.keys(this.texts).includes(value as string)) {
      return value;
    }
    return `${this.symbols[value as GameType] ?? ''} ${
      this.texts[value as GameType]
    }`;
  }
}
