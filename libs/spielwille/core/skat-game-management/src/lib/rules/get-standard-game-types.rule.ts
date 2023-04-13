import { GameType } from '../schemas/game.schema';

export const getStandardGameTypes = (): GameType[] => [
  'diamonds',
  'hearts',
  'spades',
  'clubs',
  'grand',
];
