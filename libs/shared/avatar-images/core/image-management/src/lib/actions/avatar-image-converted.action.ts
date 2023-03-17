import { createAction, props } from '@ngrx/store';

export const avatarImageConverted = createAction(
  `image-management/converted`,
  props<{ base64: string; name: string }>()
);
