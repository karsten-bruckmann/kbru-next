import { SkatList } from '@kbru/spielwille/data-access/skat-lists';

import { Game } from './game.model';

export type List = Omit<SkatList, 'playerIds' | 'gameIds'> & {
  id: string;
  description: string;
  playerNames: string[];
  games: Game[];
};
