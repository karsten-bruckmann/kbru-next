import { GameType } from '../models/game-type.model';

export const getStandardGameTypes = (): GameType[] => [
  'diamonds',
  'hearts',
  'spades',
  'clubs',
  'grand',
];
