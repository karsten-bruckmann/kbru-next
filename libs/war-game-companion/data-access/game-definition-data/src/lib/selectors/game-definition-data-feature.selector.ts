import { createFeatureSelector } from '@ngrx/store';

import { GameDefinitionDataState } from '../models/game-definition-data-state.model';

export const gameDefinitionDataFeatureSelector =
  createFeatureSelector<GameDefinitionDataState>('game-definition-data');
