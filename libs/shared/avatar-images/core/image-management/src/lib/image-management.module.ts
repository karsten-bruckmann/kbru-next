import { NgModule } from '@angular/core';
import {
  avatarImagesCoreReducerRegistry,
  AvatarImagesModule,
} from '@kbru/shared/avatar-images/data-access/avatar-images';
import { EffectsModule } from '@ngrx/effects';

import { ConvertAvatarImageEffect } from './effects/convert-avatar-image.effect';
import { avatarImagesReducer } from './reducers/avatar-images.reducer';

@NgModule({
  imports: [
    AvatarImagesModule,
    EffectsModule.forFeature([ConvertAvatarImageEffect]),
  ],
})
export class ImageManagementModule {
  constructor() {
    avatarImagesCoreReducerRegistry.add(
      avatarImagesReducer,
      'image-management'
    );
  }
}
