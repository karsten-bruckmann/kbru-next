import { createAction, props } from '@ngrx/store';

export const dataSourceUrlAddedAction = createAction(
  'data-source-management/data-source-url-added',
  props<{ url: string }>()
);
