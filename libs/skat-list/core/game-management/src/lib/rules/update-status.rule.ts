import {
  SkatList,
  SkatListStatus,
} from '@kbru/skat-list/data-access/skat-lists';

import { Game } from '../models/game.model';

export const updateStatus = (
  skatList: SkatList,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addedGame: Game
): SkatListStatus => {
  let activePlayerIds: [string, string, string];
  switch (skatList.playerIds.length) {
    case 3:
      activePlayerIds = [
        skatList.playerIds[
          (2 + skatList.gameIds.length) % skatList.playerIds.length
        ],
        skatList.playerIds[
          (3 + skatList.gameIds.length) % skatList.playerIds.length
        ],
        skatList.playerIds[
          (1 + skatList.gameIds.length) % skatList.playerIds.length
        ],
      ];
      break;
    case 4:
      activePlayerIds = [
        skatList.playerIds[
          (2 + skatList.gameIds.length) % skatList.playerIds.length
        ],
        skatList.playerIds[
          (3 + skatList.gameIds.length) % skatList.playerIds.length
        ],
        skatList.playerIds[
          (4 + skatList.gameIds.length) % skatList.playerIds.length
        ],
      ];
      break;
    case 5:
      activePlayerIds = [
        skatList.playerIds[
          (2 + skatList.gameIds.length) % skatList.playerIds.length
        ],
        skatList.playerIds[
          (4 + skatList.gameIds.length) % skatList.playerIds.length
        ],
        skatList.playerIds[
          (5 + skatList.gameIds.length) % skatList.playerIds.length
        ],
      ];
      break;
    default:
      throw new Error('invalid number of players');
  }
  return {
    activePlayerIds,
  };
};
