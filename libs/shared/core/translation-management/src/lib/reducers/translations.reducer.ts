import { TranslationsState } from '@kbru/shared/data-access/translations';
import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { on } from '@ngrx/store';
import { Md5 } from 'ts-md5';

import { translationChanged } from '../actions/translation-changed.action';
import { translationsImported } from '../actions/translations-imported.action';

export const translationsReducer = createCoreReducer<TranslationsState>(
  on(translationChanged, (state, action) => {
    const hash = Md5.hashStr(action.text);
    const next: TranslationsState = {
      ...state,
      [hash]: action.translation,
    };

    if (action.translation === '' || action.translation === action.text) {
      delete next[hash];
    }

    return next;
  }),
  on(translationsImported, (state, action) => {
    const parsed = JSON.parse(action.fileContent);
    return {
      ...state,
      ...Object.keys(parsed).reduce(
        (all, key) => ({
          ...all,
          [key.replace('translations-v2-de-', '')]: parsed[key],
        }),
        {}
      ),
    };
  })
);
