import { coreReducerRegistry } from '@kbru/shared/utils/ngrx-architecture';

import { RostersState } from './models/rosters-state.model';

export const rostersCoreReducerRegistry = coreReducerRegistry<RostersState>();
