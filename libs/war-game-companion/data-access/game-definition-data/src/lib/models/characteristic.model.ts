import { z } from 'zod';

import { characteristicsSchema } from '../schemas/characteristics.schema';

export interface Characteristic {
  name: string;
  typeId: string;
  text?: string | number;
}

export const getCharacteristics = (
  data?: z.infer<typeof characteristicsSchema>
): Characteristic[] => {
  return !data
    ? []
    : data.characteristic.map((c) => ({
        name: c['@_name'],
        typeId: c['@_typeId'],
        text: c['#text'],
      }));
};
