import {
  DurchmarschGame,
  Game,
  NullGame,
  RamschGame,
  StandardGame,
} from '../models/game.model';
import { GameType } from '../models/game-type.model';
import { List } from '../models/list.model';

const baseWorth: Record<StandardGame['gameType'], number> = {
  diamonds: 9,
  hearts: 10,
  spades: 11,
  clubs: 12,
  grand: 24,
};

const nullWorth: Record<NullGame['nullType'], number> = {
  einfach: 23,
  hand: 35,
  ouvert: 46,
  'hand-ouvert': 59,
};

function isStandardGame(
  game: Omit<Game, 'result'>
): game is Omit<StandardGame, 'result'> {
  return ['diamonds', 'hearts', 'spades', 'clubs', 'grand'].includes(
    game.gameType
  );
}

function isNullGame(
  game: Omit<Game, 'result'>
): game is Omit<NullGame, 'result'> {
  return game.gameType === 'null';
}

function isRamschGame(
  game: Omit<Game, 'result'>
): game is Omit<RamschGame, 'result'> {
  return game.gameType === 'ramsch';
}

function isDurchmarschGame(
  game: Omit<Game, 'result'>
): game is Omit<DurchmarschGame, 'result'> {
  return game.gameType === 'durchmarsch';
}

export const calculateResult = (
  game: Omit<Game, 'result'>,
  list: List
): number[] => {
  let worth = 0;

  let playerPoints = 0;
  let opponentPoints = 0;
  let inactivePoints = 0;

  if (isStandardGame(game)) {
    worth = baseWorth[game.gameType] * (Math.abs(game.spitzen) + 1);
  } else if (isNullGame(game)) {
    worth = nullWorth[game.nullType];
  } else if (isRamschGame(game)) {
    worth = game.ramschPoints / 2;
  } else if (isDurchmarschGame(game)) {
    worth = 120;
  }

  if (game.won && list.rules.calculationType === 'seger-fabian') {
    playerPoints = worth + (50 - (list.playerNames.length - 3) * 10);
  }

  if (!game.won && list.rules.calculationType === 'seger-fabian') {
    opponentPoints = worth * -2;
    opponentPoints = 50 - (list.playerNames.length - 3) * 10;
    inactivePoints = 50 - (list.playerNames.length - 3) * 10;
  }

  if (game.won && list.rules.calculationType === 'bierlachs') {
    opponentPoints = worth * -1;
  }

  if (!game.won && list.rules.calculationType === 'bierlachs') {
    playerPoints = worth * -2;
  }

  return new Array(list.playerNames.length).fill(null).map((_, i) => {
    if (i === game.playerIndex) {
      return playerPoints;
    }

    if (list.status.playerPositions[i] !== 'inactive') {
      return opponentPoints;
    }

    return inactivePoints;
  });
};
