import { avatarImageSelector as basAvatarImageSelector } from '@kbru/shared/data-access/avatar-images';
import { Md5 } from 'ts-md5';

export const avatarImageSelector = (name: string) =>
  basAvatarImageSelector(Md5.hashStr(name));
