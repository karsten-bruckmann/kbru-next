import { createAction, props } from '@ngrx/store';

export const translationsImported = createAction(
  'translation-management/translations-imported',
  props<{ fileContent: string }>()
);
