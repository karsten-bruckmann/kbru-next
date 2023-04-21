/* eslint-disable no-case-declarations */
import { v4 as uuid } from 'uuid';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import { Game, RamschGame } from '../models/game.model';
import { StandardGame } from '../models/game.model';
import { NullGame } from '../models/game.model';

export const getGameFromFormGroup = (formGroup: SkatGameFormGroup): Game => {
  if (!formGroup.valid) {
    throw new Error('error getting game value');
  }

  const value = formGroup.value;

  const gameType = value.gameType;
  const playerIndex = value.playerIndex;
  const addsBockSet = value.addsBockSet;

  if (
    typeof playerIndex !== 'number' ||
    !gameType ||
    (addsBockSet !== false && !addsBockSet)
  ) {
    throw new Error('error getting game value');
  }

  switch (gameType) {
    case 'diamonds':
    case 'hearts':
    case 'spades':
    case 'clubs':
    case 'grand':
      const spitzen = value.spitzen;
      const spritze = value.spritze;
      if (typeof spitzen !== 'number') {
        throw new Error('error getting game value');
      }
      const standardGame: StandardGame = {
        id: uuid(),
        gameType: gameType,
        playerIndex: playerIndex,
        addsBockSet: addsBockSet,
        spitzen: spitzen,
        threshold: value.threshold ?? null,
        thresholdAnnounced: value.thresholdAnnounced ?? null,
        spritze: spritze ?? null,
        won: value.won ?? false,
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
        addsBockSet: addsBockSet,
        nullType,
        won: value.won ?? false,
      };
      return nullGame;

    case 'ramsch':
      const ramschPoints = value.ramschPoints;
      if (!ramschPoints) {
        throw new Error('error getting game value');
      }
      const ramschGame: RamschGame = {
        id: uuid(),
        gameType,
        playerIndex,
        addsBockSet: addsBockSet,
        ramschPoints,
        won: false,
      };
      return ramschGame;

    case 'durchmarsch':
      throw new Error('not implemented');
  }
};
