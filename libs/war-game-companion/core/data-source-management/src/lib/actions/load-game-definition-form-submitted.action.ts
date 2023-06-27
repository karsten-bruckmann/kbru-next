import { createAction, props } from '@ngrx/store';

export const loadGameDefinitionFormSubmittedAction = createAction(
  'data-source-management/load-game-definition-form-submitted',
  props<{ indexUrl: string }>()
);
