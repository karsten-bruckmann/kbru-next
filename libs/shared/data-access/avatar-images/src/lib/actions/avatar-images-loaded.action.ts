import { createAction, props } from '@ngrx/store';

import { avatarImagesSlice } from '../avatar-images.slice';

export const avatarImagesLoaded = createAction(
  `${avatarImagesSlice}/loaded`,
  props<{ avatarImages: Record<string, string> }>()
);
