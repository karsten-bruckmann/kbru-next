import { PlayerPosition } from '../models/player-position.model';
import { getPlayerPosition } from './get-player-position.rule';

export const getPlayerPositions = (
  numberOfPlayers: number,
  numberOfPlayedGames: number
): PlayerPosition[] => {
  return new Array(numberOfPlayers)
    .fill(null)
    .map((_, i) => getPlayerPosition(i, numberOfPlayers, numberOfPlayedGames));
};
