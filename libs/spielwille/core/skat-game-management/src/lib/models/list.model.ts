import { SkatList } from '@kbru/spielwille/data-access/skat-lists';

import { Game } from './game.model';
import { ListStatus } from './list-status.model';

export type List = Omit<SkatList, 'playerIds' | 'gameIds' | 'status'> & {
  id: string;
  summary: NonNullable<
    SkatList['rules']['addOn'] | SkatList['rules']['calculationType']
  >;
  playerNames: string[];
  games: Game[];
  status: ListStatus;
  infos: {
    designatedPlayer?: number;
  };
};
