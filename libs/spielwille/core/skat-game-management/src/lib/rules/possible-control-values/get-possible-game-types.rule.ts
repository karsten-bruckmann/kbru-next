import { GameType } from '../../models/game-type.model';
import { List } from '../../models/list.model';

export const getPossibleGameTypes = (list: List): GameType[] => {
  if (
    list.status?.fixedSets[0] &&
    list.status?.fixedSets[0].type === 'ramsch' &&
    list.status?.fixedSets[0].remainingGames > 0
  ) {
    return ['ramsch', 'durchmarsch', 'grand'];
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

  return types;
};
