import {
  SkatList,
  SkatListStatus,
} from '@kbru/spielwille/data-access/skat-lists';

import { Game } from '../schemas/game.schema';

export const updateStatus = (
  skatList: SkatList,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addedGame: Game
): SkatListStatus => {
  let activePlayers: [number, number, number];
  switch (skatList.playerIds.length) {
    case 3:
      activePlayers = [
        (2 + skatList.gameIds.length) % skatList.playerIds.length,
        (3 + skatList.gameIds.length) % skatList.playerIds.length,
        (1 + skatList.gameIds.length) % skatList.playerIds.length,
      ];
      break;
    case 4:
      activePlayers = [
        (2 + skatList.gameIds.length) % skatList.playerIds.length,
        (3 + skatList.gameIds.length) % skatList.playerIds.length,
        (4 + skatList.gameIds.length) % skatList.playerIds.length,
      ];
      break;
    case 5:
      activePlayers = [
        (2 + skatList.gameIds.length) % skatList.playerIds.length,
        (4 + skatList.gameIds.length) % skatList.playerIds.length,
        (5 + skatList.gameIds.length) % skatList.playerIds.length,
      ];
      break;
    default:
      throw new Error('invalid number of players');
  }
  return {
    activePlayers,
  };
};
