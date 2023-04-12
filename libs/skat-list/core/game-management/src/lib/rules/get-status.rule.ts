import { SkatListStatus } from '@kbru/skat-list/data-access/skat-lists';

import { Player } from '../models/player.model';
import { Status } from '../models/status.model';

export const getStatus = (
  listStatus: SkatListStatus,
  listPlayers: Player[]
): Status => {
  return {
    activePlayers: listStatus.activePlayerIds.map(
      (playerId) =>
        listPlayers.find((player) => player.id === playerId) || {
          id: '',
          name: 'unknown player',
        }
    ),
  };
};
