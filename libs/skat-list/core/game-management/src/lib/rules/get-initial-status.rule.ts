import { SkatList } from '@kbru/skat-list/data-access/skat-lists';

import { Status } from '../models/status.model';

export const getInitialStatus = (list: SkatList): Status => {
  let activePlayers: [number, number, number];
  switch (list.playerIds.length) {
    case 3:
      activePlayers = [1, 2, 0];
      break;
    case 4:
      activePlayers = [1, 2, 3];
      break;
    case 5:
      activePlayers = [1, 3, 4];
      break;
    default:
      throw new Error('invalid number of players');
  }

  return {
    activePlayers,
  };
};
