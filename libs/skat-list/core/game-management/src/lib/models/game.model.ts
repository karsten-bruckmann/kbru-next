import { GameType, NullGameType, StandardGameType } from './game-type.type';

export interface BaseGame {
  id: string;
  gameType: GameType;
}

export interface StandardGame extends BaseGame {
  gameType: StandardGameType;
  playerIndex: number;
  spitzen: number;
}

export interface NullGame extends BaseGame {
  gameType: NullGameType;
  playerIndex: number;
  nullGame: 'einfach' | 'hand' | 'ouvert' | 'hand-ouvert';
}

export type Game = StandardGame | NullGame;
