import { createReducer, on } from '@ngrx/store';

import { avatarImageConverted } from '../actions/avatar-image-converted.action';
import { avatarImageRemoved } from '../actions/avatar-image-removed.action';
import { avatarImagesLoaded } from '../actions/avatar-images-loaded.action';
import { avatarImagesInitialState } from '../avatar-images.initial-state';
import { AvatarImagesState } from '../models/avatar-images-state.model';

export const avatarImagesReducer = createReducer<AvatarImagesState>(
  avatarImagesInitialState,
  on(avatarImagesLoaded, (state, action) => ({
    ...state,
    ...action.avatarImages,
  })),
  on(avatarImageConverted, (state, action) => ({
    ...state,
    [action.name]: action.base64,
  })),
  on(avatarImageRemoved, (state, action) => {
    const next = { ...state };
    delete next[action.name];
    return next;
  })
);
