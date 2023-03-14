import { createAction, props } from '@ngrx/store';

import { avatarImagesSlice } from '../avatar-images.slice';

export const avatarImageAdded = createAction(
  `${avatarImagesSlice}/added`,
  props<{ image: File; name: string }>()
);
