import { coreReducerRegistry } from '@kbru/shared/utils/ngrx-architecture';

import { TranslationsState } from './models/translations-state.model';

export const translationsCoreReducerRegistry =
  coreReducerRegistry<TranslationsState>();
