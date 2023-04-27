import { GameType } from '../models/game-type.model';
import { List } from '../models/list.model';
import { Status } from '../models/status.model';

export const getPossibleGameTypes = (
  list: Omit<List, 'status'> & { status?: Status }
): Record<number, GameType[]> => {
  if (
    list.status?.fixedSets[0] &&
    list.status?.fixedSets[0].type === 'ramsch' &&
    list.status?.fixedSets[0].remainingGames > 0
  ) {
    return new Array(list.playerNames.length).fill([
      'ramsch',
      'durchmarsch',
      'grand',
    ]);
  }

  let types: GameType[] = [
    'diamonds',
    'hearts',
    'spades',
    'clubs',
    'grand',
    'null',
  ];

  if (list.rules.ramsch) {
    types = [...types, 'ramsch', 'durchmarsch'];
  }

  return new Array(list.playerNames.length).fill(types);
};
