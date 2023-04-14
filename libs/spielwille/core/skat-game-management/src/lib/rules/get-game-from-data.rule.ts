/* eslint-disable no-case-declarations */
import { SkatGame } from '@kbru/spielwille/data-access/skat-games';
import { v4 as uuid } from 'uuid';

import { Game, NullGame, RamschGame, StandardGame } from '../models/game.model';

export const getGameFromData = (skatGame: SkatGame): Game | null => {
  const gameType = skatGame.gameType;
  const playerIndex = skatGame.playerIndex;
  const addsBockSet = skatGame.addsBockSet;

  switch (gameType) {
    case 'diamonds':
    case 'hearts':
    case 'spades':
    case 'clubs':
    case 'grand':
      const spitzen = skatGame.spitzen;
      const threshold = skatGame.threshold;
      const thresholdAnnounced = skatGame.thresholdAnnounced;
      const spritze = skatGame.spritze;
      if (
        typeof spitzen !== 'number' ||
        threshold === undefined ||
        threshold === undefined ||
        thresholdAnnounced === undefined ||
        spritze === undefined
      ) {
        return null;
      }
      const standardGame: StandardGame = {
        id: uuid(),
        gameType: gameType,
        playerIndex: playerIndex,
        addsBockSet: addsBockSet,
        spitzen: spitzen,
        threshold: threshold,
        thresholdAnnounced: thresholdAnnounced,
        spritze: spritze,
      };
      return standardGame;

    case 'null':
      const nullType = skatGame.nullType;
      if (!nullType) {
        return null;
      }
      const nullGame: NullGame = {
        id: uuid(),
        gameType,
        playerIndex,
        addsBockSet,
        nullType,
      };
      return nullGame;

    case 'ramsch':
      const ramschPoints = skatGame.ramschPoints;
      if (typeof ramschPoints !== 'number') {
        return null;
      }
      const ramschGame: RamschGame = {
        id: uuid(),
        gameType,
        playerIndex,
        addsBockSet,
        ramschPoints,
      };
      return ramschGame;

    default:
      return null;
  }
};
