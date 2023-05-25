import { SkatList } from '@kbru/spielwille/data-access/skat-lists';

import { Player } from '../models/player.model';

export const getListPlayerNames = (
  list: SkatList,
  players: Player[]
): string[] =>
  list.playerIds
    .map((playerId) => players.find((player) => player.id === playerId)?.name)
    .filter((p): p is string => !!p);
