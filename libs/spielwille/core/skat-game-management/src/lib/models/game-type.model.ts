import { Game } from './game.model';

export type GameType = Game['gameType'];

export function stringToGameType(input: string): GameType {
  switch (input) {
    case 'clubs':
    case 'diamonds':
    case 'durchmarsch':
    case 'grand':
    case 'hearts':
    case 'null':
    case 'ramsch':
    case 'spades':
      return input as GameType;
  }

  throw new Error();
}
