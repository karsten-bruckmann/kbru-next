import { translationSelector as baseTranslationSelector } from '@kbru/shared/data-access/translations';
import { createSelector } from '@ngrx/store';
import { Md5 } from 'ts-md5';

export const translationSelector = (text: string) => {
  const hash = Md5.hashStr(text);
  return createSelector(baseTranslationSelector(hash), (translation) =>
    translation === hash ? text : translation
  );
};
