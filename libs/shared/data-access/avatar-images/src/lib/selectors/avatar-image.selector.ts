import { createSelector } from '@ngrx/store';

import { avatarImagesFeatureSelector } from './avatar-images-feature.selector';

export const avatarImageSelector = (name: string) =>
  createSelector(avatarImagesFeatureSelector, (state) => state[name]);
