import { coreReducerRegistry } from '@kbru/shared/utils/ngrx-architecture';

import { SkatGamesState } from './models/skat-games-state.model';

export const skatGamesCoreReducerRegistry =
  coreReducerRegistry<SkatGamesState>();
