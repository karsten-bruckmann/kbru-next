import { List } from '../models/list.model';
import { Status } from '../models/status.model';
import { getActivePlayers } from './get-active-players.rule';
import { getPossibleGameTypes } from './get-possible-game-types.rule';

export const getInitialStatus = (list: Omit<List, 'status'>): Status => {
  return {
    activePlayers: getActivePlayers(list.playerNames.length, 0),
    fixedSets: [],
    availableGameTypes: getPossibleGameTypes(
      list.rules.addOn,
      list.rules.ramsch !== false,
      list.playerNames.length,
      []
    ),
  };
};
