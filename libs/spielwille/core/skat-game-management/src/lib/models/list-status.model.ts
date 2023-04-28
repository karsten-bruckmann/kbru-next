import { SkatListStatus } from '@kbru/spielwille/data-access/skat-lists';

import { GameType } from './game-type.model';
import { PlayerPosition } from './player-position.model';

export type ListStatus = SkatListStatus & {
  availableGameTypes: GameType[][];
  playerPositions: PlayerPosition[];
};
