import { coreReducerRegistry } from '@kbru/shared/utils/ngrx-architecture';

import { SkatListsState } from './models/skat-lists-state.model';

export const skatListsCoreReducerRegistry =
  coreReducerRegistry<SkatListsState>();
