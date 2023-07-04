import { z } from 'zod';

import { costsSchema } from '../schemas/costs.schema';

export interface Cost {
  name: string;
  typeId: string;
  value: string;
}

export const getCosts = (data?: z.infer<typeof costsSchema>): Cost[] => {
  return !data
    ? []
    : data.cost.map((c) => ({
        name: c['@_name'],
        typeId: c['@_typeId'],
        value: c['@_value'],
      }));
};
