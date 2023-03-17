import { createAction, props } from '@ngrx/store';

export const translationChanged = createAction(
  'translation-management/translation-changed',
  props<{ text: string; translation: string }>()
);
