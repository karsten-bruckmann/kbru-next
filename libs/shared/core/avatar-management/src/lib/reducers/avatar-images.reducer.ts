import { AvatarImagesState } from '@kbru/shared/data-access/avatar-images';
import { createCoreReducer } from '@kbru/shared/utils/ngrx-architecture';
import { on } from '@ngrx/store';
import { Md5 } from 'ts-md5';

import { avatarImageConverted } from '../actions/avatar-image-converted.action';
import { avatarImageRemoved } from '../actions/avatar-image-removed.action';

export const avatarImagesReducer = createCoreReducer<AvatarImagesState>(
  on(avatarImageConverted, (state, action) => ({
    ...state,
    [Md5.hashStr(action.name)]: action.base64,
  })),
  on(avatarImageRemoved, (state, action) => {
    const next = { ...state };
    delete next[Md5.hashStr(action.name)];
    return next;
  })
);
