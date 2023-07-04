import { createReducer, on } from '@ngrx/store';

import { catalogueLoadedAction } from '../actions/catalogue-loaded.action';
import { gameDefinitionDataInitialState } from '../game-definition-data.initial-state';
import { getCatalogue } from '../models/catalogue.model';
import { GameDefinitionDataState } from '../models/game-definition-data-state.model';
import { getGameSystem } from '../models/game-system.model';

export const gameDefinitionDataReducer =
  createReducer<GameDefinitionDataState | null>(
    gameDefinitionDataInitialState,
    on(
      catalogueLoadedAction,
      (state, action): GameDefinitionDataState => ({
        gameSystem: getGameSystem(action.gameSystem),
        catalogue: getCatalogue(action.catalogue),
      })
    )
  );
