/* eslint-disable no-case-declarations */
import { v4 as uuid } from 'uuid';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { Game } from '../models/game.model';
import { StandardGame } from '../models/game.model';
import { NullGame } from '../models/game.model';

export const getGameFromFormGroup = (
  formGroup: SkatGameFormGroup
): Game | null => {
  if (!formGroup.valid) {
    return null;
  }

  const value = formGroup.value;

  const gameType = value.gameType;
  const playerIndex = value.playerIndex;

  if (typeof playerIndex !== 'number' || !gameType) {
    return null;
  }

  switch (gameType) {
    case 'diamonds':
    case 'hearts':
    case 'spades':
    case 'clubs':
    case 'grand':
      const spitzen = value.spitzen;
      const threshold = value.threshold;
      const thresholdAnnounced = value.thresholdAnnounced;
      const spritze = value.spritze;
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
        spitzen: spitzen,
        threshold: threshold,
        thresholdAnnounced: thresholdAnnounced,
        spritze: spritze,
      };
      return standardGame;

    case 'null':
      const nullType = value.nullType;
      if (!nullType) {
        return null;
      }
      const nullGame: NullGame = {
        id: uuid(),
        gameType,
        playerIndex,
        nullType,
      };
      return nullGame;
  }
};
