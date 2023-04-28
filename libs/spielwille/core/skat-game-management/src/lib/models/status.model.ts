import { SkatListStatus } from '@kbru/spielwille/data-access/skat-lists';

import { GameType } from './game-type.model';

export type Status = Omit<SkatListStatus, 'availableGameTypes'> & {
  availableGameTypes: GameType[][];
};
