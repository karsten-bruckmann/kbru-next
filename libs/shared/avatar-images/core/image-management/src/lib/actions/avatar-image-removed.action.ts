import { createAction, props } from '@ngrx/store';

export const avatarImageRemoved = createAction(
  `image-management/removed`,
  props<{ name: string }>()
);
