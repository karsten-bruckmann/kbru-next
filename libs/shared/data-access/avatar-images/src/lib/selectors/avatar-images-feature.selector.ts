import { createFeatureSelector } from '@ngrx/store';

import { AvatarImagesState } from '../models/avatar-images-state.model';

export const avatarImagesFeatureSelector =
  createFeatureSelector<AvatarImagesState>('avatar-images');
