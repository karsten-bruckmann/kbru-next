import { createAction, props } from '@ngrx/store';

import { Game } from '../models/game.model';

export const skatGameFormSubmittedAction = createAction(
  'skat-game-management/skat-game-form-submitted',
  props<{ game: Game; listId: string }>()
);
