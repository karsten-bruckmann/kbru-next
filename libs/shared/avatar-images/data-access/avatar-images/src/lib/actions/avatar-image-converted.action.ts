import { createAction, props } from '@ngrx/store';

import { avatarImagesSlice } from '../avatar-images.slice';

export const avatarImageConverted = createAction(
  `${avatarImagesSlice}/converted`,
  props<{ base64: string; name: string }>()
);
