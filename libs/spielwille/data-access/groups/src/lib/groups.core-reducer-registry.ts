import { coreReducerRegistry } from '@kbru/shared/utils/ngrx-architecture';

import { GroupsState } from './models/groups-state.model';

export const groupsCoreReducerRegistry = coreReducerRegistry<GroupsState>();
