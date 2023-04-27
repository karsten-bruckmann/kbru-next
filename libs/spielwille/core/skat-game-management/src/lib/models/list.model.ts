import { SkatList } from '@kbru/spielwille/data-access/skat-lists';

import { Game } from './game.model';
import { Status } from './status.model';

export type List = Omit<SkatList, 'playerIds' | 'gameIds' | 'status'> & {
  id: string;
  description: string;
  playerNames: string[];
  games: Game[];
  status: Status;
};
