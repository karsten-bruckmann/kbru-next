/* eslint-disable no-case-declarations */
import { v4 as uuid } from 'uuid';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { Game } from '../models/game.model';
import { StandardGame } from '../models/game.model';
import { NullGame } from '../models/game.model';

export const getGameFromFormGroup = (formGroup: SkatGameFormGroup): Game => {
  if (!formGroup.valid) {
    throw new Error('error getting game value');
  }

  const value = formGroup.value;

  const gameType = value.gameType;
  const playerIndex = value.playerIndex;

  if (typeof playerIndex !== 'number' || !gameType) {
    throw new Error('error getting game value');
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
      if (typeof spitzen !== 'number') {
        throw new Error('error getting game value');
      }
      const standardGame: StandardGame = {
        id: uuid(),
        gameType: gameType,
        playerIndex: playerIndex,
        spitzen: spitzen,
        threshold: threshold ?? null,
        thresholdAnnounced: thresholdAnnounced ?? null,
        spritze: spritze ?? null,
      };
      return standardGame;

    case 'null':
      const nullType = value.nullType;
      if (!nullType) {
        throw new Error('error getting game value');
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
