import { coreReducerRegistry } from '@kbru/shared/utils/ngrx-architecture';

import { PlayersState } from './models/players-state.model';

export const playersCoreReducerRegistry = coreReducerRegistry<PlayersState>();
