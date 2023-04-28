import { AddOn } from '@kbru/spielwille/data-access/skat-lists';

import { Game } from '../models/game.model';
import { ListStatus } from '../models/list-status.model';
import { getPlayerPositions } from './get-player-positions.rule';
import { getPossibleGameTypes } from './get-possible-game-types.rule';

export const getListStatus = (
  numberOfPlayers: number,
  listHasRamsch: boolean,
  addon: AddOn,
  games: Game[],
  listHasRamschAfterBockSet: boolean
): ListStatus => {
  const fixedSets: { type: 'bock' | 'ramsch'; remainingGames: number }[] = [];
  games.forEach((game) => {
    if (fixedSets[0]?.remainingGames > 0) {
      fixedSets[0].remainingGames--;
    }
    if (fixedSets[0]?.remainingGames === 0) {
      fixedSets.shift();
    }

    if (game.addsBockSet) {
      fixedSets.push({ type: 'bock', remainingGames: numberOfPlayers });
      if (listHasRamschAfterBockSet) {
        fixedSets.push({ type: 'ramsch', remainingGames: numberOfPlayers });
      }
    }
  });

  return {
    fixedSets,
    playerPositions: getPlayerPositions(numberOfPlayers, games.length),
    availableGameTypes: getPossibleGameTypes(
      addon,
      listHasRamsch,
      numberOfPlayers,
      games,
      fixedSets
    ),
  };
};
