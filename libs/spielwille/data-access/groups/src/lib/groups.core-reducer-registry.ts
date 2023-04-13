import { coreReducerRegistry } from '@kbru/shared/utils/ngrx-architecture';

import { GroupsState } from './schemas/groups-state.schema';

export const groupsCoreReducerRegistry = coreReducerRegistry<GroupsState>();
