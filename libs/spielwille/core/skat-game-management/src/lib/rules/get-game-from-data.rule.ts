/* eslint-disable no-case-declarations */
import { SkatGame } from '@kbru/spielwille/data-access/skat-games';
import { v4 as uuid } from 'uuid';

import {
  DurchmarschGame,
  Game,
  NullGame,
  RamschGame,
  StandardGame,
} from '../models/game.model';

export const getGameFromData = (skatGame: SkatGame): Game | null => {
  const gameType = skatGame.gameType;
  const playerIndex = skatGame.playerIndex;
  const addsBockSet = skatGame.addsBockSet;
  const won = skatGame.won;
  const spitzen = skatGame.spitzen;
  const threshold = skatGame.threshold;
  const thresholdAnnounced = skatGame.thresholdAnnounced;
  const spritze = skatGame.spritze;
  const result = skatGame.result;

  switch (gameType) {
    case 'diamonds':
    case 'hearts':
    case 'spades':
    case 'clubs':
    case 'grand':
      if (
        typeof spitzen !== 'number' ||
        threshold === undefined ||
        threshold === undefined ||
        thresholdAnnounced === undefined ||
        spritze === undefined ||
        won === undefined
      ) {
        return null;
      }
      const standardGame: StandardGame = {
        id: uuid(),
        gameType,
        playerIndex,
        addsBockSet,
        spitzen,
        threshold,
        thresholdAnnounced,
        spritze,
        won,
        result,
      };
      return standardGame;

    case 'null':
      const nullType = skatGame.nullType;
      if (!nullType || won === undefined) {
        return null;
      }
      const nullGame: NullGame = {
        id: uuid(),
        gameType,
        playerIndex,
        addsBockSet,
        nullType,
        won,
        result,
      };
      return nullGame;

    case 'ramsch':
      const ramschPoints = skatGame.ramschPoints;
      if (typeof ramschPoints !== 'number' || won === undefined) {
        return null;
      }
      const ramschGame: RamschGame = {
        id: uuid(),
        gameType,
        playerIndex,
        addsBockSet,
        ramschPoints,
        won: false,
        result,
      };
      return ramschGame;

    case 'durchmarsch':
      const durchmarschGame: DurchmarschGame = {
        id: uuid(),
        gameType,
        playerIndex,
        addsBockSet,
        won: true,
        result,
      };
      return durchmarschGame;

    default:
      return null;
  }
};
