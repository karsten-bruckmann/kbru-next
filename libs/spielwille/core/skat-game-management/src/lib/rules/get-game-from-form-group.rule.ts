/* eslint-disable no-case-declarations */
import { v4 as uuid } from 'uuid';

import { SkatGameFormGroup } from '../form-groups/skat-game.form-group';
import {
  DurchmarschGame,
  Game,
  NullGame,
  RamschGame,
  StandardGame,
} from '../models/game.model';
import { List } from '../models/list.model';
import { calculateResult } from './calulate-result.rule';

export class InvalidFormDataError extends Error {}

export const getGameFromFormGroup = (
  formGroup: SkatGameFormGroup,
  list: List
): Game => {
  const value = formGroup.getRawValue();

  const gameType = value.gameType;
  const playerIndex = value.playerIndex;
  const addsBockSet = value.addsBockSet ?? false;

  if (typeof playerIndex !== 'number' || !gameType) {
    throw new InvalidFormDataError('error getting game value');
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
        throw new InvalidFormDataError('error getting game value');
      }
      const standardGame: Omit<StandardGame, 'result'> = {
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
      return { ...standardGame, result: calculateResult(standardGame, list) };

    case 'null':
      const nullType = value.nullType;
      if (!nullType) {
        throw new InvalidFormDataError('error getting game value');
      }
      const nullGame: Omit<NullGame, 'result'> = {
        id: uuid(),
        gameType,
        playerIndex,
        addsBockSet,
        nullType,
        won: value.won ?? false,
      };
      return { ...nullGame, result: calculateResult(nullGame, list) };

    case 'ramsch':
      const ramschPoints = value.ramschPoints;
      if (!ramschPoints) {
        throw new InvalidFormDataError('error getting game value');
      }
      const ramschGame: Omit<RamschGame, 'result'> = {
        id: uuid(),
        gameType,
        playerIndex,
        addsBockSet,
        ramschPoints,
        won: false,
      };
      return { ...ramschGame, result: calculateResult(ramschGame, list) };

    case 'durchmarsch':
      const durchmarschGame: Omit<DurchmarschGame, 'result'> = {
        id: uuid(),
        gameType,
        playerIndex,
        addsBockSet,
        won: true,
      };
      return {
        ...durchmarschGame,
        result: calculateResult(durchmarschGame, list),
      };
  }
};
