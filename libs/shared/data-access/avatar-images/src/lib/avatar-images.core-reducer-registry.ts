import { coreReducerRegistry } from '@kbru/shared/utils/ngrx-architecture';

import { AvatarImagesState } from './models/avatar-images-state.model';

export const avatarImagesCoreReducerRegistry =
  coreReducerRegistry<AvatarImagesState>();
