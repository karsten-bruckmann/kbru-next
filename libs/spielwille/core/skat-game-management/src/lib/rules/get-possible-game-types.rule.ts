import { AddOn } from '@kbru/spielwille/data-access/skat-lists';

import {
  DurchmarschGame,
  Game,
  RamschGame,
  StandardGame,
} from '../models/game.model';
import { GameType } from '../models/game-type.model';

type RomanowGameType = (
  | StandardGame
  | RamschGame
  | DurchmarschGame
)['gameType'];

const romanowCategoryMap: Record<RomanowGameType, RomanowGameType[]> = {
  diamonds: ['diamonds', 'hearts', 'spades', 'clubs'],
  hearts: ['diamonds', 'hearts', 'spades', 'clubs'],
  spades: ['diamonds', 'hearts', 'spades', 'clubs'],
  clubs: ['diamonds', 'hearts', 'spades', 'clubs'],
  grand: ['grand'],
  ramsch: ['ramsch', 'durchmarsch'],
  durchmarsch: ['ramsch', 'durchmarsch'],
};

export const getPossibleGameTypes = (
  addOn: AddOn,
  listHasRamsch: boolean,
  numberOfPlayers: number,
  listGames: Game[]
): GameType[][] => {
  if (addOn === 'romanow') {
    let result: GameType[][] = [];
    const allPlayerTypes: GameType[] = ['ramsch', 'durchmarsch'];
    const nextPlayerTypes: GameType[] = [
      'diamonds',
      'hearts',
      'spades',
      'grand',
    ];
    for (let i = 0; i < numberOfPlayers; i++) {
      result[i] = [
        ...(i === (listGames.length + 1) % numberOfPlayers
          ? nextPlayerTypes
          : []),
        ...allPlayerTypes,
      ];
    }

    for (
      let i = listGames.length % numberOfPlayers;
      i < listGames.length;
      i += numberOfPlayers
    ) {
      result = result.map((types) =>
        types.filter(
          (type) =>
            !romanowCategoryMap[
              listGames[i].gameType as RomanowGameType
            ].includes(type as RomanowGameType)
        )
      );
    }

    return result;
  }

  let types: GameType[] = [
    'diamonds',
    'hearts',
    'spades',
    'clubs',
    'grand',
    'null',
  ];

  if (listHasRamsch) {
    types = [...types, 'ramsch', 'durchmarsch'];
  }

  return new Array(numberOfPlayers).fill(types);
};
