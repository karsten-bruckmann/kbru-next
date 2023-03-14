import { createAction, props } from '@ngrx/store';

import { avatarImagesSlice } from '../avatar-images.slice';

export const avatarImageRemoved = createAction(
  `${avatarImagesSlice}/removed`,
  props<{ name: string }>()
);
