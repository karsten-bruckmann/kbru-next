import { List } from '../models/list.model';
import { Status } from '../models/status.model';
import { getPossibleGameTypes } from './get-possible-game-types.rule';

export const getInitialStatus = (list: Omit<List, 'status'>): Status => {
  let activePlayers: [number, number, number];
  switch (list.playerNames.length) {
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
    fixedSets: [],
    availableGameTypes: getPossibleGameTypes(list),
  };
};
