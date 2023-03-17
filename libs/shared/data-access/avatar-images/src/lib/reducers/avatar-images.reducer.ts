import { createReducer, on } from '@ngrx/store';

import { avatarImagesLoaded } from '../actions/avatar-images-loaded.action';
import { avatarImagesInitialState } from '../avatar-images.initial-state';
import { AvatarImagesState } from '../models/avatar-images-state.model';

export const avatarImagesReducer = createReducer<AvatarImagesState>(
  avatarImagesInitialState,
  on(avatarImagesLoaded, (state, action) => ({
    ...state,
    ...action.avatarImages,
  }))
);
