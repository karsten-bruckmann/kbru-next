import { createReducer, on } from '@ngrx/store';

import { gameDefinitionDataLoaded } from '../actions/game-definition-data-loaded.action';
import { gameDefinitionDataInitialState } from '../game-definition-data.initial-state';
import { GameDefinitionDataState } from '../models/game-definition-data-state.model';

export const gameDefinitionDataReducer =
  createReducer<GameDefinitionDataState | null>(
    gameDefinitionDataInitialState,
    on(
      gameDefinitionDataLoaded,
      (state, action): GameDefinitionDataState => action.gameDefinitionData
    )
  );
