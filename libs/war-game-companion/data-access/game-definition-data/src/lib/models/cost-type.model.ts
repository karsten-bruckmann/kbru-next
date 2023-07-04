import { z } from 'zod';

import { costTypesSchema } from '../schemas/cost-types.schema';

export interface CostType {
  hidden: boolean;
  id: string;
  name: string;
  defaultCostLimit: string;
}

export const getCostTypes = (
  data?: z.infer<typeof costTypesSchema>
): CostType[] => {
  return !data
    ? []
    : data.costType.map((ct) => ({
        hidden: ct['@_hidden'] === 'true',
        id: ct['@_id'],
        name: ct['@_name'],
        defaultCostLimit: ct['@_defaultCostLimit'],
      }));
};
