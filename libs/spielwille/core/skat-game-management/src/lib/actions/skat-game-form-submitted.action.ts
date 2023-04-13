import { createAction, props } from '@ngrx/store';

import { Game } from '../schemas/game.schema';

export const skatGameFormSubmittedAction = createAction(
  'skat-game-management/skat-game-form-submitted',
  props<{ game: Game; listId: string }>()
);
