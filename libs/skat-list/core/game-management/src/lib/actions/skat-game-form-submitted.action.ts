import { SkatGame } from '@kbru/skat-list/data-access/skat-games';
import { createAction, props } from '@ngrx/store';

export const skatGameFormSubmittedAction = createAction(
  'skat-game-management/skat-game-form-submitted',
  props<{ skatGame: SkatGame; uuid: string; listId: string }>()
);
