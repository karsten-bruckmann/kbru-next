import { createAction } from '@ngrx/store';

import { avatarImagesSlice } from '../avatar-images.slice';

export const avatarImagesSliceLoaded = createAction(
  `${avatarImagesSlice}/slice-loaded`
);
