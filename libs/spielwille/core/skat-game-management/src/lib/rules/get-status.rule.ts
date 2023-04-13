import { SkatListStatus } from '@kbru/spielwille/data-access/skat-lists';

import { Status } from '../models/status.model';

export const getStatus = (listStatus: SkatListStatus): Status => {
  return {
    activePlayers: listStatus.activePlayers,
  };
};
