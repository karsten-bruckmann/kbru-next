import { TranslationsState } from '@kbru/shared/translatable/data-access/translations';
import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { on } from '@ngrx/store';
import { Md5 } from 'ts-md5';

import { translationChanged } from '../actions/translation-changed.action';

export const translationsReducer = createCoreReducer<TranslationsState>(
  on(translationChanged, (state, action) => ({
    ...state,
    [Md5.hashStr(action.text)]: action.translation,
  }))
);
