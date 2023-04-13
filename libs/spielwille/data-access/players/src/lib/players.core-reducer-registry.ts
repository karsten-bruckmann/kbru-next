import { coreReducerRegistry } from '@kbru/shared/utils/ngrx-architecture';

import { PlayersState } from './schemas/players-state.schema';

export const playersCoreReducerRegistry = coreReducerRegistry<PlayersState>();
