import { FixedSet } from './fixed-set.model';
import { GameType } from './game-type.model';
import { PlayerInfo } from './player-info.model';
import { PlayerPosition } from './player-position.model';

export type ListStatus = {
  fixedSets: FixedSet[];
  availableGameTypes: GameType[][];
  playerPositions: PlayerPosition[];
  playerInfos: PlayerInfo[][];
};
