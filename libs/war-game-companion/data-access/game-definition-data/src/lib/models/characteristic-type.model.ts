import { z } from 'zod';

import { characteristicTypesSchema } from '../schemas/characteristic-types.schema';

export interface CharacteristicType {
  id: string;
  name: string;
}

export const getCharacteristicTypes = (
  data?: z.infer<typeof characteristicTypesSchema>
): CharacteristicType[] => {
  return !data
    ? []
    : data.characteristicType.map((ct) => ({
        id: ct['@_id'],
        name: ct['@_name'],
      }));
};
