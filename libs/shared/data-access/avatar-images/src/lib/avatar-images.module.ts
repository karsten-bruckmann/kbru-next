import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { avatarImagesCoreReducerRegistry } from './avatar-images.core-reducer-registry';
import { avatarImagesSlice } from './avatar-images.slice';
import { LoadAvatarImagesEffect } from './effects/load-avatar-images.effect';
import { PersistAvatarImagesEffect } from './effects/persist-avatar-images.effect';
import { AvatarImagesState } from './models/avatar-images-state.model';
import { avatarImagesReducer } from './reducers/avatar-images.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<AvatarImagesState>(
      avatarImagesSlice,
      avatarImagesReducer,
      {
        metaReducers: [avatarImagesCoreReducerRegistry.metaReducer],
      }
    ),
    EffectsModule.forFeature([
      LoadAvatarImagesEffect,
      PersistAvatarImagesEffect,
    ]),
  ],
})
export class AvatarImagesModule {}
