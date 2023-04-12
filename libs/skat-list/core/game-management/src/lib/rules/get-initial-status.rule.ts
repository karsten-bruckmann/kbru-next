import { SkatList } from '@kbru/skat-list/data-access/skat-lists';

import { Player } from '../models/player.model';
import { Status } from '../models/status.model';

export const getInitialStatus = (
  list: SkatList,
  listPlayers: Player[]
): Status => {
  let activePlayerIds: string[];
  switch (list.playerIds.length) {
    case 3:
      activePlayerIds = [
        list.playerIds[1],
        list.playerIds[2],
        list.playerIds[0],
      ];
      break;
    case 4:
      activePlayerIds = [
        list.playerIds[1],
        list.playerIds[2],
        list.playerIds[3],
      ];
      break;
    case 5:
      activePlayerIds = [
        list.playerIds[1],
        list.playerIds[3],
        list.playerIds[4],
      ];
      break;
    default:
      throw new Error('invalid number of players');
  }

  return {
    activePlayers: activePlayerIds.map(
      (playerId) =>
        listPlayers.find((player) => player.id === playerId) || {
          id: '',
          name: 'unknown player',
        }
    ),
  };
};
