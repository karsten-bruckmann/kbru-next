import {
  SkatList,
  SkatListStatus,
} from '@kbru/spielwille/data-access/skat-lists';

import { FixedSet } from '../models/fixed-set.model';
import { Game } from '../models/game.model';

export const updateStatus = (
  skatList: SkatList,
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

  const fixedSets: FixedSet[] = skatList.status
    ? skatList.status.fixedSets
    : [];
  if (addedGame.addsBockSet) {
    fixedSets.push({
      type: 'bock',
      remainingGames: skatList.playerIds.length,
    });
    if (skatList.rules.ramsch) {
      fixedSets.push({
        type: 'bock',
        remainingGames: skatList.playerIds.length,
      });
    }
  }

  return {
    activePlayers,
    fixedSets,
  };
};
