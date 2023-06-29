import { gameDefinitionDataSlice } from '../game-definition-data.slice';
import { GameDefinitionDataState } from './game-definition-data-state.model';

export interface GameDefinitionDataStateAware {
  [gameDefinitionDataSlice]: GameDefinitionDataState | null;
}
