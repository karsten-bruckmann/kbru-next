import { GameType } from '../schemas/game.schema';

export const getAllGameTypes = (): GameType[] => [
  'diamonds',
  'hearts',
  'spades',
  'clubs',
  'grand',
  'hearts',
];
