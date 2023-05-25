import {
  DurchmarschGame,
  Game,
  NullGame,
  RamschGame,
  StandardGame,
} from '../models/game.model';
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

const spritzeModifier: Record<NonNullable<StandardGame['spritze']>, number> = {
  kontra: 2,
  re: 4,
  hirsch: 8,
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

  if (isStandardGame(game) || isNullGame(game)) {
    const spritze = game.spritze;

    if (spritze) {
      worth *= spritzeModifier[spritze];
    }
  }

  if (game.bock) {
    worth *= 2;
  }

  switch (list.rules.calculationType) {
    case 'seger-fabian':
      if (game.won) {
        playerPoints = worth + 50;
      } else {
        playerPoints = worth * -2 - 50;
        opponentPoints = 40 - (list.playerNames.length - 3) * 10;
        inactivePoints = 40 - (list.playerNames.length - 3) * 10;
      }
      break;
    case 'classic':
      if (game.won) {
        playerPoints = worth;
      } else {
        playerPoints = worth * -2;
      }
      break;
    case 'bierlachs':
      if (game.won) {
        opponentPoints = worth * -1;
      } else {
        playerPoints = worth * -2;
      }
      break;
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
