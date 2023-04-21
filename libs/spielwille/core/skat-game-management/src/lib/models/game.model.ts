export interface BaseGame {
  id: string;
  playerIndex: number;
  addsBockSet: boolean;
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
