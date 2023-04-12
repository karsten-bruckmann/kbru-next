export type StandardGameType =
  | 'diamonds'
  | 'hearts'
  | 'spades'
  | 'clubs'
  | 'grand';

export type NullGameType = 'null';

export type GameType = StandardGameType | NullGameType;

export function isStandardGameType(
  gameType: string
): gameType is StandardGameType {
  return (
    gameType === 'diamonds' ||
    gameType === 'hearts' ||
    gameType === 'spades' ||
    gameType === 'clubs' ||
    gameType === 'grand'
  );
}

export function isNullGameType(gameType: string): gameType is StandardGameType {
  return gameType === 'null';
}
