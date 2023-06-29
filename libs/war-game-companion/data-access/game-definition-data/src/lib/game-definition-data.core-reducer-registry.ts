import { coreReducerRegistry } from '@kbru/shared/utils/ngrx-architecture';

import { GameDefinitionDataState } from './models/game-definition-data-state.model';

export const gameDefinitionDataCoreReducerRegistry =
  coreReducerRegistry<GameDefinitionDataState | null>();
