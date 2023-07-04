import { createReducer, on } from '@ngrx/store';

import { catalogueLoadedAction } from '../actions/catalogue-loaded.action';
import { gameDefinitionDataInitialState } from '../game-definition-data.initial-state';
import { GameDefinitionDataState } from '../models/game-definition-data-state.model';

export const gameDefinitionDataReducer =
  createReducer<GameDefinitionDataState | null>(
    gameDefinitionDataInitialState,
    on(
      catalogueLoadedAction,
      (state, action): GameDefinitionDataState => ({
        gameSystem: action.gameSystem,
        catalogue: action.catalogue,
      })
    )
  );
