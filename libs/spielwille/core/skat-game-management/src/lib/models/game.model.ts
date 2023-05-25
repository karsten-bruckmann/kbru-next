export interface BaseGame {
  id: string;
  playerIndex: number;
  addsBockSet: boolean;
  bock: boolean;
  result: number[];
}

export interface StandardGame extends BaseGame {
  gameType: 'diamonds' | 'hearts' | 'spades' | 'clubs' | 'grand';
  spitzen: number;
  threshold: null | 'schneider' | 'schwarz';
  thresholdAnnounced: null | 'schneider' | 'schwarz';
  spritze: null | 'kontra' | 're' | 'hirsch';
  won: boolean;
}

export interface NullGame extends BaseGame {
  gameType: 'null';
  nullType: 'einfach' | 'hand' | 'ouvert' | 'hand-ouvert';
  spritze: null | 'kontra' | 're' | 'hirsch';
  won: boolean;
}

export interface RamschGame extends BaseGame {
  gameType: 'ramsch';
  ramschPoints: number;
  won: false;
}

export interface DurchmarschGame extends BaseGame {
  gameType: 'durchmarsch';
  won: true;
}

export type Game = StandardGame | NullGame | RamschGame | DurchmarschGame;

export const isStandardGame = (game: Game): game is StandardGame =>
  ['diamonds', 'hearts', 'spades', 'clubs', 'grand'].includes(game.gameType);

export const isNullGame = (game: Game): game is NullGame =>
  ['null'].includes(game.gameType);

export const isRamschGame = (game: Game): game is RamschGame =>
  ['ramsch'].includes(game.gameType);

export const isDurchmarschGame = (game: Game): game is DurchmarschGame =>
  ['durchmarsch'].includes(game.gameType);
