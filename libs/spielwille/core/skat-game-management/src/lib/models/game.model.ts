export interface BaseGame {
  id: string;
  playerIndex: number;
}

export interface StandardGame extends BaseGame {
  gameType: 'diamonds' | 'hearts' | 'spades' | 'clubs' | 'grand';
  spitzen: number;
  threshold: null | 'schneider' | 'schwarz';
  thresholdAnnounced: null | 'schneider' | 'schwarz';
  spritze: null | 'kontra' | 're' | 'hirsch';
}

export interface NullGame extends BaseGame {
  gameType: 'null';
  nullType: 'einfach' | 'hand' | 'ouvert' | 'hand-ouvert';
}

export type Game = StandardGame | NullGame;
