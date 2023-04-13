import { coreReducerRegistry } from '@kbru/shared/utils/ngrx-architecture';

import { SkatListsState } from './schemas/skat-lists-state.schema';

export const skatListsCoreReducerRegistry =
  coreReducerRegistry<SkatListsState>();
