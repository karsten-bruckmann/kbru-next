import { SkatListStatus } from '@kbru/skat-list/data-access/skat-lists';

import { Status } from '../models/status.model';

export const getStatus = (listStatus: SkatListStatus): Status => {
  return {
    activePlayers: listStatus.activePlayers,
  };
};
