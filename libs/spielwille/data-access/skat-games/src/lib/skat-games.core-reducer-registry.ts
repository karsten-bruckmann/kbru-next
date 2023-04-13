import { coreReducerRegistry } from '@kbru/shared/utils/ngrx-architecture';

import { SkatGamesState } from './schemas/skat-games-state.schema';

export const skatGamesCoreReducerRegistry =
  coreReducerRegistry<SkatGamesState>();
