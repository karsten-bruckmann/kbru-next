import { GameType, stringToGameType } from '../models/game-type.model';

export const safeAvailableGameTypes = (
  availableTypes: string[][]
): GameType[][] => {
  return availableTypes.map((types) => types.map(stringToGameType));
};
