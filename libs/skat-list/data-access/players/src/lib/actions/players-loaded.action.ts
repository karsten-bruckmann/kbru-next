import { createAction, props } from '@ngrx/store';

import { PlayersResponse } from '../api-clients/players.api-client';
import { playersSlice } from '../players.slice';

export const playersLoaded = createAction(
  `${playersSlice}/loaded`,
  props<{ players: PlayersResponse }>()
);
