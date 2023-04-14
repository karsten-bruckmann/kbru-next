import { GameType } from '../models/game-type.model';
import { List } from '../models/list.model';

export const getPossibleGameTypes = (list: List): GameType[] => [
  ...(<GameType[]>['diamonds', 'hearts', 'spades', 'clubs', 'grand', 'null']),
  ...(list.rules.ramsch ? <GameType[]>['ramsch', 'durchmarsch'] : []),
];
