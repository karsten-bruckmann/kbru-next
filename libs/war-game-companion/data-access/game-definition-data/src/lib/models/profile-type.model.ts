import { z } from 'zod';

import { profileTypesSchema } from '../schemas/profile-types.schema';
import {
  CharacteristicType,
  getCharacteristicTypes,
} from './characteristic-type.model';

export interface ProfileType {
  __type: 'ProfileType';
  id: string;
  name: string;
  characteristicTypes: CharacteristicType[];
}

export const getProfileTypes = (
  data?: z.infer<typeof profileTypesSchema>
): ProfileType[] => {
  return !data
    ? []
    : data.profileType.map((pt) => ({
        __type: 'ProfileType',
        id: pt['@_id'],
        name: pt['@_name'],
        characteristicTypes: getCharacteristicTypes(pt.characteristicTypes),
      }));
};
