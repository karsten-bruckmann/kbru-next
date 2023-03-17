import { createAction, props } from '@ngrx/store';

export const avatarImageAdded = createAction(
  `image-management/added`,
  props<{ image: File; name: string }>()
);
