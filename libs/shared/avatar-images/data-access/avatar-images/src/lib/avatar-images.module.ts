import { NgModule } from '@angular/core';
import { createIndexedDbPersistMetaReducer } from '@kbru/shared/utils/ngrx-storage-sync';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { avatarImagesLoaded } from './actions/avatar-images-loaded.action';
import { avatarImagesCoreReducerRegistry } from './avatar-images.core-reducer-registry';
import { avatarImagesSlice } from './avatar-images.slice';
import { ConvertAvatarImageEffect } from './effects/convert-avatar-image.effect';
import { LoadAvatarImagesEffect } from './effects/load-avatar-images.effect';
import { AvatarImagesState } from './models/avatar-images-state.model';
import { avatarImagesReducer } from './reducers/avatar-images.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<AvatarImagesState>(
      avatarImagesSlice,
      avatarImagesReducer,
      {
        metaReducers: [
          avatarImagesCoreReducerRegistry.metaReducer,
          createIndexedDbPersistMetaReducer(
            avatarImagesSlice,
            avatarImagesSlice,
            avatarImagesLoaded.type
          ),
        ],
      }
    ),
    EffectsModule.forFeature([
      LoadAvatarImagesEffect,
      ConvertAvatarImageEffect,
    ]),
  ],
})
export class AvatarImagesModule {}